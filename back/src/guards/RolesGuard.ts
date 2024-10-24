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


    console.log('RolesGuard: Required roles:', requiredRoles);

    if (!requiredRoles) {
      throw new ForbiddenException("Roles are required to access this route");
    }
    
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log('RolesGuard: User from request:', user ? user.user_id : 'No user found');

    if (!user || !user.user_id) {
      throw new ForbiddenException("User ID not found in request");
    }

    console.log('RolesGuard: Fetching user from database with ID:', user.user_id);

    const userWithRole = await this.prisma.user.findUnique({
      where: { user_id: user.user_id },  
      include: { role: true }, 
    });

    if (!userWithRole) {
      throw new ForbiddenException("User does not exist");
    }

    const userRole = userWithRole.role.role_name;

    console.log('RolesGuard: User role:', userRole);

    const hasRole = requiredRoles.includes(userRole);

    console.log('RolesGuard: User has required role:', hasRole);

    if (!hasRole) {
      throw new ForbiddenException(
        "You do not have permission to access this route"
      );
    }

    return true;
  }
}
