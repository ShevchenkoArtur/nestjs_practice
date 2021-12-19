import {forwardRef, Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {UserModule} from "../user/user.module";
import {JwtModule, JwtService} from "@nestjs/jwt";

@Module({
    imports: [
        forwardRef(() => UserModule),
        JwtModule.register({
            secret: '123'
        })
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [
        AuthService,
        JwtModule,
    ]
})
export class AuthModule {
}
