import {BadRequestException, Injectable} from '@nestjs/common';
import {UserDto} from "../user/dto/user.dto";
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import {hash, compare} from "bcryptjs";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    private generateToken(email) {
        const payload = {email}

        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async register(userDto: UserDto) {
        const oldUser = await this.userService.findUserByEmail(userDto.email);
        if(oldUser) {
            throw new BadRequestException('User already exist')
        }

        const newUser = await this.userService.createUser(
            {
                ...userDto,
                password: await hash(userDto.password, 5)
            }
        );

        return this.generateToken(userDto.email);
    }

    async login(userDto: UserDto) {
        const user = await this.userService.findUserByEmail(userDto.email);
        if(!user) {
            throw new BadRequestException('user not found');
        }

        const isCorrectPassword = await compare(userDto.password, user.password);
        if(!isCorrectPassword) {
            throw new BadRequestException('wrong password');
        }

        return this.generateToken(userDto.email)
    }
}
