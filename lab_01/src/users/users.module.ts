import {forwardRef, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users.model";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import {BasketModule} from "../basket/basket.module";
import {RatingModule} from "../rating/rating.module";
import {DeviceModule} from "../device/device.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
      SequelizeModule.forFeature([User, Role, UserRoles]),
      RolesModule,
      forwardRef(() => AuthModule),
      forwardRef(() => BasketModule),
      forwardRef(() => RatingModule),
      forwardRef(() => DeviceModule)

  ],
    exports: [
        UsersService
    ]
})
export class UsersModule {}
