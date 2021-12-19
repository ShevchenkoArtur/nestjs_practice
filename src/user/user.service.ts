import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {UserModel} from "./model/user.model";
import {UserDto} from "./dto/user.dto";

@Injectable()
export class UserService {
    constructor(@InjectModel(UserModel) private readonly userRepo: typeof UserModel) {}

    async createUser(userDto: UserDto) {
        return this.userRepo.create(userDto);
    }

    async findAllUsers() {
        return this.userRepo.findAll();
    }
}
