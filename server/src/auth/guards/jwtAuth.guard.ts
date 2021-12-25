import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        try {
          const authHeader = req.headers.authorization;
          const authType = authHeader.split(' ')[0];
          const token = authHeader.split(' ')[1];

          if(authType !== 'Bearer' || !token) {
              throw new UnauthorizedException();
          }

          const userDate = this.jwtService.verify(token);
          return true;
        } catch (e) {
            throw new UnauthorizedException();
        }
    }
}