import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {RoleModel} from "./models/role.model";
import {UserRoleModel} from "./models/userRole.model";

@Module({
  imports: [SequelizeModule.forFeature([RoleModel, UserRoleModel])],
  providers: [RoleService],
  controllers: [RoleController],
  exports: [RoleService]
})
export class RoleModule {}
