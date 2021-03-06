import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {UserDto} from "../user/dto/user.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() userDto: UserDto) {
        return this.authService.register(userDto);
    }

    @Post('login')
    login(@Body() userDto: UserDto) {
        return this.authService.login(userDto);
    }
}
