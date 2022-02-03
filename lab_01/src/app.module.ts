import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {UserRoles} from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { BasketModule } from './basket/basket.module';
import {Basket} from "./basket/basket.model";
import { DeviceModule } from './device/device.module';
import {Device} from "./device/device.model";
import {BasketDevice} from "./device/basket-device.model";
import {Brand} from "./device/brand.model";
import {Type} from "./device/type.model";
import {DeviceInfo} from "./device/device-info.model";
import { RatingModule } from './rating/rating.module';
import {Rating} from "./rating/rating.model";
import { FilesModule } from './files/files.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from 'path';

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Role, UserRoles, Basket, Brand, Type, Device, BasketDevice, DeviceInfo, Rating],
            autoLoadModels: true,

        }),
        UsersModule,
        RolesModule,
        AuthModule,
        BasketModule,
        DeviceModule,
        RatingModule,
        FilesModule,
    ]
})

export class AppModule {}

