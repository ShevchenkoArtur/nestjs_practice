import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {RoleModel} from "./model/role.model";

@Module({
  imports: [SequelizeModule.forFeature([RoleModel])],
  providers: [RoleService],
  controllers: [RoleController]
})
export class RoleModule {}
