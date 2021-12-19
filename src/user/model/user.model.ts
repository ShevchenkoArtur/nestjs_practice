import {Column, Model, Table, DataType} from "sequelize-typescript";
import {UserDto} from "../dto/user.dto";

@Table({tableName: 'users'})
export class UserModel extends Model<UserModel, UserDto> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email:string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;
}