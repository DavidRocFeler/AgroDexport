import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PrismaService } from "../prisma/prisma.service"; 

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService 
  ) {}

  async canActivate(
    context: ExecutionContext
  ): Promise<boolean> {

    const requiredRoles = this.reflector.getAllAndOverride<string[]>("roles", [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      throw new ForbiddenException("Roles are required to access this route");
    }
    
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.user_id) {
      throw new ForbiddenException("User ID not found in request");
    }

    const userWithRole = await this.prisma.user.findUnique({
      where: { user_id: user.user_id },  
      include: { role: true }, 
    });

    if (!userWithRole) {
      throw new ForbiddenException("User does not exist");
    }

    const userRole = userWithRole.role.role_name;

    console.log('User Role:', userRole);

    const hasRole = requiredRoles.includes(userRole);

    console.log('Has required role:', hasRole);

    if (!hasRole) {
      throw new ForbiddenException(
        "You do not have permission to access this route"
      );
    }

    return true;
  }
}
