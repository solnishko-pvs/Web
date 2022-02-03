import {forwardRef, Module} from '@nestjs/common';
import { BasketService } from './basket.service';
import {BasketController} from "./basket.controller";
import {SequelizeModule} from "@nestjs/sequelize";
import {Role} from "../roles/roles.model";
import {User} from "../users/users.model";
import {UserRoles} from "../roles/user-roles.model";
import {Basket} from "./basket.model";
import {DeviceModule} from "../device/device.module";
import {UsersModule} from "../users/users.module";
import {BasketDevice} from "../device/basket-device.model";

@Module({
  controllers:[BasketController],
  providers: [BasketService],
  imports: [
      SequelizeModule.forFeature([Role, User, UserRoles, Basket, BasketDevice]),
      DeviceModule,
      forwardRef(() => UsersModule),
  ],
    exports: [
        BasketService
    ]
})
export class BasketModule {}
