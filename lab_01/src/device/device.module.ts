import {forwardRef, Module} from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Role} from "../roles/roles.model";
import {User} from "../users/users.model";
import {Basket} from "../basket/basket.model";
import {UserRoles} from "../roles/user-roles.model";
import {Device} from "./device.model";
import {Brand} from "./brand.model";
import {Type} from "./type.model";
import {BasketDevice} from "./basket-device.model";
import {DeviceInfo} from "./device-info.model";
import {Rating} from "../rating/rating.model";
import {RatingModule} from "../rating/rating.module";
import {FilesModule} from "../files/files.module";

@Module({
  providers: [DeviceService],
  controllers: [DeviceController],
  imports: [
      SequelizeModule.forFeature([User, Role, UserRoles, Basket, Brand, Type, Device, BasketDevice, DeviceInfo, Rating]),
      forwardRef(() => RatingModule),
      FilesModule
  ],
  exports: [
      DeviceService,

  ]
})
export class DeviceModule {}

