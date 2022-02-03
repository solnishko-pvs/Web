import {Body, Controller, Get, HttpCode, Param, Post, Res} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {BasketService} from "./basket.service";
import {CreateBasketDto} from "./dto/create-basket.dto";
import {Basket} from "./basket.model";
import {Role} from "../roles/roles.model";
import {AddRoleDto} from "../users/dto/add-role.dto";
import {AddDeviceDto} from "./dto/add-device.dto";
import {RemoveRoleDto} from "../users/dto/remove-role.dto";
import {RemoveDeviceDto} from "./dto/remove-device.dto";


@ApiTags('Корзина')
@Controller('/basket')
export class BasketController {

    constructor(private basketService: BasketService) {}

    @ApiOperation({summary: 'Получить информацию о корзине пользователя'})
    @ApiResponse({status: 200, type: Basket})
    @ApiResponse({status: 404, description: 'Такого пользователя не существует'})
    @Get('/:userId')
    getByValue(@Param('userId') userId: number) {
        return this.basketService.myGetBasketByUserId(userId);
    }

    // @ApiOperation({summary: 'Получить все корзины'})
    // @ApiResponse({status: 200, type: [Basket]})
    // @Get()
    // getAll() {
    //     return this.basketService.getAllBaskets();
    // }

    @ApiOperation({summary: 'Добавить товар в корзину'})
    @ApiResponse({status: 200})
    @ApiResponse({status: 404, description: 'Пользователь или товар не найден'})
    @HttpCode(200)
    @Post('/device/add')
    addDevice(@Body() dto: AddDeviceDto) {
        return this.basketService.addDevice(dto);
    }

    @ApiOperation({summary: 'Удалить товар из корзины'})
    @ApiResponse({status: 200})
    @ApiResponse({status: 404, description: 'Пользователь или товар не найден'})
    @HttpCode(200)
    @Post('/device/remove')
    removeDevice(@Body() dto: RemoveDeviceDto) {
        return this.basketService.removeDevice(dto);
    }

}
