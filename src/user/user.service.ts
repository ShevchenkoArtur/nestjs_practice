import {BadRequestException, Injectable} from '@nestjs/common';
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
        const role = await this.roleService.findRoleByValue('admin');
        await user.$set('roles', [role.id]);
        user.roles = [role];
        return user;
    }

    async findAllUsers() {
        return this.userRepo.findAll({include: {all: true}});
    }

    async findUserByEmail(email) {
        return this.userRepo.findOne({where: {email}, include: {all: true}})
    }

    async addRole(addRoleDto) {
        const user = await this.userRepo.findByPk(addRoleDto.userId);
        const role = await this.roleService.findRoleByValue(addRoleDto.value);

        if(user && role) {
            await user.$add('role', role.id)
            return user
        }

        throw new BadRequestException()
    }
}
