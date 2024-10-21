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

        if (!token) {
            throw new UnauthorizedException("Bearer token not found ")
        }
        else {
            const secret = process.env.JWT_SECRET
            const payload = this.jwtService.verify( token, { secret})

            if ( payload ) {
                payload.iat = new Date(payload.iat * 1000)
                payload.exp = new Date(payload.exp * 1000)
                payload.roll = [ ]


                if (payload) {
                    request.user = {
                        ...payload,
                        user_id: payload.user_id,  
                        role: payload.role,        
                    };

                    return true;
                  }
                  
                return true
            }
            else {
                throw new UnauthorizedException(" Invalid Token")
            }
        }
    }
}