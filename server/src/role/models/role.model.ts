import {Column, Model, Table, DataType, BelongsToMany} from "sequelize-typescript";
import {RoleDto} from "../dto/role.dto";
import {UserModel} from "../../user/model/user.model";
import {UserRoleModel} from "./userRole.model";

@Table({tableName: 'roles'})
export class RoleModel extends Model<RoleModel, RoleDto> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string;

    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @BelongsToMany(() => UserModel, () => UserRoleModel)
    users: UserModel[];
}