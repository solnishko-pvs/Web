import {forwardRef, Module} from '@nestjs/common';
import { RatingService } from './rating.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {Rating} from "./rating.model";
import {UsersModule} from "../users/users.module";
import {DeviceModule} from "../device/device.module";

@Module({
  controllers: [],
  providers: [RatingService],
  imports: [
      SequelizeModule.forFeature([User, Role, UserRoles, Rating]),
      forwardRef(() => UsersModule),
      forwardRef(() => DeviceModule)
  ],
  exports: [
      RatingService
  ]
})
export class RatingModule {}
