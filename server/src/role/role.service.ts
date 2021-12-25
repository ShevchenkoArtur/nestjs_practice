import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {RoleModel} from "./models/role.model";
import {RoleDto} from "./dto/role.dto";

@Injectable()
export class RoleService {
    constructor(@InjectModel(RoleModel) private readonly roleRepo: typeof RoleModel) {}

    async createRole(roleDto: RoleDto) {
        return this.roleRepo.create(roleDto);
    }

    async findRoleByValue(value: string) {
        return this.roleRepo.findOne({where: {value}})
    }
}
