import {Column, Model, Table, DataType} from "sequelize-typescript";
import {RoleDto} from "../dto/role.dto";

@Table({tableName: 'roles'})
export class RoleModel extends Model<RoleModel, RoleDto> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string;

    @Column({type: DataType.STRING, allowNull: false})
    description: string;
}