import {forwardRef, HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Basket} from "./basket.model";
import {CreateBasketDto} from "./dto/create-basket.dto";
import {AddDeviceDto} from "./dto/add-device.dto";
import {RemoveDeviceDto} from "./dto/remove-device.dto";
import {UsersService} from "../users/users.service";
import {DeviceService} from "../device/device.service";
import {BasketDevice} from "../device/basket-device.model";
import {Device} from "../device/device.model";

@Injectable()
export class BasketService {

    constructor(@InjectModel(Basket) private basketRepository: typeof Basket,
                @InjectModel(BasketDevice) private basketDeviceRepository: typeof BasketDevice,
                private deviceService: DeviceService,
                @Inject(forwardRef(() => UsersService)) private userService: UsersService) {}


    async createBasket(dto: CreateBasketDto) {
        const check = await this.getBasketByUserId(dto.userId);
        if (check) {
            throw new HttpException('Данный пользователь имеет корзину', HttpStatus.FORBIDDEN)
        }
        const basket = await this.basketRepository.create(dto);
        return basket;
    }

    private async getBasketByUserId(userId: number) {
        const basket = await this.basketRepository.findOne({where: {userId}});
        return basket;
    }

    async myGetBasketByUserId(userId: number) {
        const basket = await this.basketRepository.findOne({where: {userId}, include: {model:Device, as:'devices', through: {attributes:['deviceCnt']}}});
        if (!basket) {
            throw new HttpException('Такого пользователя не существует', HttpStatus.NOT_FOUND)
        }
        return basket;
    }

    async getAllBaskets() {
        const baskets = await this.basketRepository.findAll({include: Device});
        return baskets;
    }

    async deleteBasket(userId: number) {
        const basket = await this.getBasketByUserId(userId);
        await basket.destroy();
        return basket;
    }

    private async getBasketDevice(basketId: number, deviceId: number) {
        return await this.basketDeviceRepository.findOne({where: {basketId, deviceId}});
    }

    async addDevice(addDeviceDto: AddDeviceDto) {
        const user = await this.userService.getUserByEmail(addDeviceDto.userEmail);
        if(!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }
        const device = await this.deviceService.getDeviceById(addDeviceDto.deviceId);
        const basket = await this.getBasketByUserId(user.id);

        if (basket && device) {
            const basketDevice = await this.getBasketDevice(basket.id, device.id);
            if (!basketDevice) {
                await basket.$add('device', device.id);
                return;
            }
            basketDevice.deviceCnt +=1;
            await basketDevice.save();
            return;
        }
        throw new HttpException('Корзина или товар не найден', HttpStatus.NOT_FOUND);
    }


    async removeDevice(removeDeviceDto: RemoveDeviceDto) {
        const user = await this.userService.getUserByEmail(removeDeviceDto.userEmail);
        if(!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);
        }
        const device = await this.deviceService.getDeviceById(removeDeviceDto.deviceId);
        const basket = await this.getBasketByUserId(user.id);

        if (basket && device) {
            const basketDevice = await this.getBasketDevice(basket.id, device.id);
            if (!basketDevice) {
                return;
            }
            if (basketDevice.deviceCnt == 1) {
                await basket.$remove('device', device.id);
                return;
            }
            basketDevice.deviceCnt -=1;
            await basketDevice.save();
            return;
        }
        throw new HttpException('Корзина или товар не найден', HttpStatus.BAD_REQUEST);
    }
}


