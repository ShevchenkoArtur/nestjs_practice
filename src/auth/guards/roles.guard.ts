import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "../../role/decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        try {
            const requiredRoles = this.reflector.getAllAndOverride(
                ROLES_KEY,
                [
                    context.getHandler(),
                    context.getClass()
                ]
            )
            if(!requiredRoles) {
                return true;
            }

            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            const authType = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            if(authType !== 'Bearer' || !token) {
                throw new UnauthorizedException('не авторизован');
            }

            const userDate = this.jwtService.verify(token);
            return userDate.roles.some(role => requiredRoles.includes(role.value));
        } catch (e) {
            throw new UnauthorizedException('Нет доступа');
        }
    }
}