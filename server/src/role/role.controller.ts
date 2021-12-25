import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {RoleService} from "./role.service";
import {RoleDto} from "./dto/role.dto";

@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Post()
    createRole(@Body() roleDto: RoleDto) {
        return this.roleService.createRole(roleDto)
    }

    @Get(':value')
    findRoleByValue(@Param('value') value: string) {
        return this.roleService.findRoleByValue(value);
    }
}
