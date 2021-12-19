import {Column, Model, Table, DataType, BelongsToMany} from "sequelize-typescript";
import {UserDto} from "../dto/user.dto";
import {ApiProperty} from "@nestjs/swagger";
import {RoleModel} from "../../role/models/role.model";
import {UserRoleModel} from "../../role/models/userRole.model";

@Table({tableName: 'users'})
export class UserModel extends Model<UserModel, UserDto> {
    @ApiProperty({example: '1', description: 'Unique identifier'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'email21@gmail.com', description: 'Email address'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email:string;

    @ApiProperty({example: 'qweg324tf', description: 'Password'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: 'true', description: 'Ban status'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @ApiProperty({example: 'Due to bad things', description: 'Ban description'})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;

    @BelongsToMany(() => RoleModel, () => UserRoleModel)
    roles: RoleModel[];
}