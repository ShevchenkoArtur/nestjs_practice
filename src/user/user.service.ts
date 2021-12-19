import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {UserModel} from "./model/user.model";
import {UserDto} from "./dto/user.dto";
import {RoleService} from "../role/role.service";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(UserModel)
        private readonly userRepo: typeof UserModel,
        private readonly roleService: RoleService
    ) {}

    async createUser(userDto: UserDto) {
        const user = await this.userRepo.create(userDto);
        const role = await this.roleService.findRoleByValue('user');
        await user.$set('roles', [role.id]);

        return user;
    }

    async findAllUsers() {
        return this.userRepo.findAll({include: {all: true}});
    }
}
