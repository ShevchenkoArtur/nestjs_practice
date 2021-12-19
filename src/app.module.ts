import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";
import { UserModule } from './user/user.module';
import {UserModel} from "./user/model/user.model";
import { RoleModule } from './role/role.module';
import {RoleModel} from "./role/models/role.model";
import {UserRoleModel} from "./role/models/userRole.model";
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [UserModel, RoleModel, UserRoleModel],
            autoLoadModels: true,
        }),
        UserModule,
        RoleModule,
        AuthModule,
    ],
})
export class AppModule {
}
