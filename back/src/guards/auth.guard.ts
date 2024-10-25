import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService
    ){}
    
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {    

        const request = context.switchToHttp().getRequest()
        const token = request.headers["authorization"]?.split(" ")[1] ?? ""

        console.log(token ? 'AuthGuard: Token found' : 'AuthGuard: No token provided');

        if (!token) {
            throw new UnauthorizedException("Bearer token not found ")
        }
        else {
            const secret = process.env.JWT_SECRET

            try {
            const payload = this.jwtService.verify( token, { secret})

            if ( payload ) {

                console.log('AuthGuard: Token is valid');
                payload.iat = new Date(payload.iat * 1000)
                payload.exp = new Date(payload.exp * 1000)

                console.log(`AuthGuard: Payload - User ID: ${payload.user_id}, Role: ${payload.role}`);

                    request.user = {
                        ...payload,
                        user_id: payload.user_id,  
                        role: payload.role,        
                    };

                    return true;

            }
        } catch (error) {
            // Log para tokens inválidos
            console.log('AuthGuard: Invalid token detected');
            throw new UnauthorizedException("Invalid Token");
          }
        }
    
        // Log para cualquier otro caso no manejado
        console.log('AuthGuard: Unhandled case');
        return false;
      }
}