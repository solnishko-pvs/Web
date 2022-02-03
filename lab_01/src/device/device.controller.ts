import {
    Body,
    Controller,
    Delete,
    forwardRef,
    Get, HttpCode,
    Inject, Optional,
    Param,
    Patch,
    Post,
    UploadedFile,
    UseInterceptors, UsePipes
} from '@nestjs/common';
import {ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {DeviceService} from "./device.service";
import {Brand} from "./brand.model";
import {CreateBrandDto} from "./dto/create-brand.dto";
import {UpdateBrandDto} from "./dto/update-brand.dto";
import {CreateTypeDto} from "./dto/create-type.dto";
import {Type} from "./type.model";
import {UpdateTypeDto} from "./dto/update-type.dto";
import {CreateDeviceInfoDto} from "./dto/create-device-info.dto";
import {DeviceInfo} from "./device-info.model";
import {CreateDeviceDto} from "./dto/create-device.dto";
import {Device} from "./device.model";
import {UpdateDeviceInfoDto} from "./dto/update-device-info.dto";
import {UpdateDeviceDto} from "./dto/update-device.dto";
import {Rating} from "../rating/rating.model";
import {CreateRatingDto} from "../rating/dto/create-rating.dto";
import {RatingService} from "../rating/rating.service";
import {DeleteRatingDto} from "../rating/dto/delete-rating.dto";
import {UpdateRatingDto} from "../rating/dto/update-rating.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {ApiImplicitFile} from "@nestjs/swagger/dist/decorators/api-implicit-file.decorator";
import {OptionalFileDto} from "./dto/optionalFile.dto";

@ApiTags('Товары')
@Controller('/device')
export class DeviceController {

    constructor(private deviceService: DeviceService,
                @Inject(forwardRef(() => RatingService)) private ratingService: RatingService) {}

    @ApiOperation({summary: 'Создание бренда'})
    @ApiResponse({status: 200, type: Brand})
    @ApiResponse({status: 404, description: 'Данный бренд уже существует'})
    @HttpCode(200)
    @Post('/brand')
    createBrand(@Body() brandDto: CreateBrandDto) {
        return this.deviceService.createBrand(brandDto);
    }

    // @ApiOperation({summary: 'Получить информацию о бренде'})
    // @ApiResponse({status: 200, type: Brand})
    // @Get('/brand/:brandId')
    // getBrandById(@Param('brandId') brandId: number) {
    //     return this.deviceService.getBrandByBrandId(brandId);
    // }

    @ApiOperation({summary: 'Получить все бренды'})
    @ApiResponse({status: 200, type: [Brand]})
    @Get('/brand')
    getAllBrands() {
        return this.deviceService.getAllBrands();
    }

    @ApiOperation({summary: 'Удалить бренд'})
    @ApiResponse({status: 200, type: Brand})
    @ApiResponse({status: 404, description: 'Бренд не найден'})
    @Delete('/brand/:brandId')
    deleteBrand(@Param('brandId') brandId: number) {
        return this.deviceService.deleteBrand(brandId);
    }

    @ApiOperation({summary: 'Обновить бренд'})
    @ApiResponse({status: 200, type: Brand})
    @ApiResponse({status: 404, description: 'Бренд не найден или бренд с таким именем уже существует'})
    @Patch('/brand/:brandId')
    updateBrand(@Param('brandId') brandId: number,
                @Body() brandDto: UpdateBrandDto) {
        return this.deviceService.updateBrand(brandId, brandDto);
    }



    @ApiOperation({summary: 'Создание типа'})
    @ApiResponse({status: 200, type: Type})
    @ApiResponse({status: 404, description: 'Данный тип уже существует'})
    @HttpCode(200)
    @Post('/type')
    createType(@Body() typeDto: CreateTypeDto) {
        return this.deviceService.createType(typeDto);
    }

    // @ApiOperation({summary: 'Получить информацию о типе'})
    // @ApiResponse({status: 200, type: Type})
    // @Get('/type/:typeId')
    // getTypeById(@Param('typeId') typeId: number) {
    //     return this.deviceService.getTypeByTypeId(typeId);
    // }

    @ApiOperation({summary: 'Получить все типы'})
    @ApiResponse({status: 200, type: [Type]})
    @Get('/type')
    getAllTypes() {
        return this.deviceService.getAllTypes();
    }

    @ApiOperation({summary: 'Удалить тип'})
    @ApiResponse({status: 200, type: Type})
    @ApiResponse({status: 404, description: 'Тип не найден'})
    @Delete('/type/:typeId')
    deleteType(@Param('typeId') typeId: number) {
        return this.deviceService.deleteType(typeId);
    }

    @ApiOperation({summary: 'Обновить тип'})
    @ApiResponse({status: 200, type: Type})
    @ApiResponse({status: 404, description: 'Тип не найден или тип с таким именем уже существует'})
    @Patch('/type/:typeId')
    updateType(@Param('typeId') typeId: number,
                @Body() typeDto: UpdateTypeDto) {
        return this.deviceService.updateType(typeId, typeDto);
    }



    @ApiOperation({summary: 'Создание записи информации о товаре'})
    @ApiResponse({status: 200, type: DeviceInfo})
    @ApiResponse({status: 404, description: 'Такого товара не существует или у данного товара уже есть такая характеристика'})
    @HttpCode(200)
    @Post('/deviceInfo')
    createDeviceInfo(@Body() deviceInfoDto: CreateDeviceInfoDto) {
        return this.deviceService.createDeviceInfo(deviceInfoDto);
    }

    // @ApiOperation({summary: 'Получить все записи информации о всех товарах'})
    // @ApiResponse({status: 200, type: [DeviceInfo]})
    // @Get('/deviceInfo')
    // getAllDeviceInfos() {
    //     return this.deviceService.getAllDeviceInfos();
    // }

    @ApiOperation({summary: 'Получить все записи информации о товаре'})
    @ApiResponse({status: 200, type: [DeviceInfo]})
    @Get('/deviceInfo/:deviceId')
    getDeviceInfoByDeviceId(@Param('deviceId') deviceId: number) {
        return this.deviceService.getDeviceInfoByDeviceId(deviceId);
    }

    @ApiOperation({summary: 'Удалить запись информации о товаре'})
    @ApiResponse({status: 200, type: DeviceInfo})
    @ApiResponse({status: 404, description: 'Запись не найдена'})
    @Delete('/deviceInfo/:deviceInfoId')
    deleteDeviceInfo(@Param('deviceInfoId') deviceInfoId: number) {
        return this.deviceService.deleteDeviceInfo(deviceInfoId);
    }

    @ApiOperation({summary: 'Обновить запись информации о товаре'})
    @ApiResponse({status: 200, type: DeviceInfo})
    @ApiResponse({status: 404, description: 'Запись не найдена'})
    @Patch('/:deviceId/title/:title')
    updateDeviceInfo(@Param('deviceId') deviceId: number,
                     @Param('title') title: string,
               @Body() dto: UpdateDeviceInfoDto) {
        return this.deviceService.updateDeviceInfo(deviceId, title, dto);
    }



    @ApiOperation({summary: 'Создание товара'})
    @ApiResponse({status: 200,
        schema: {
            type: 'object',
            properties: {
                rating: {type: 'number', example: 3.5},
                id: {type: 'number', example: 1},
                name: {type: 'string', example: 'Iphone 10'},
                price: {type: 'number', example: 49990},
                typeId: {type: 'number', example: 1},
                brandId: {type: 'number', example: 1},
                img: {type: 'string', example: '1.jpg'}
        }
    }})
    @ApiResponse({status: 404, description: 'Товар с таким названием уже существует или ' +
            'бренда с таким идентификатором не существует или типа с таким идентификатором не существует или изображение не загружено'})
    @HttpCode(200)
    @Post()
    @UseInterceptors(FileInterceptor('img'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                name: {type: 'string', example: 'Iphone 10'},
                price:{type: 'number', example: 49990},
                img: {type: 'string', format: 'binary'},
                typeId: {type: 'number', example: 1},
                brandId: {type: 'number', example: 1}
            },
        },
    })
    createDevice(@Body() deviceDto: CreateDeviceDto,
                 @UploadedFile() img: OptionalFileDto) {
        return this.deviceService.createDevice(deviceDto, img);
    }

    @ApiOperation({summary: 'Получить все товары'})
    @ApiResponse({status: 200, type: [Device]})
    @Get()
    getAllDevices() {
        return this.deviceService.getAllDevices();
    }

    @ApiOperation({summary: 'Получить информацию о товаре'})
    @ApiResponse({status: 200, type: Device})
    @ApiResponse({status: 404, description: 'Такого товара не существует'})
    @Get('/:deviceId')
    getDeviceById(@Param('deviceId') deviceId: number) {
        return this.deviceService.getDeviceById(deviceId);
    }

    @ApiOperation({summary: 'Удалить товар'})
    @ApiResponse({status: 200,
        schema: {
            type: 'object',
            properties: {
                rating: {type: 'number', example: 3.5},
                id: {type: 'number', example: 1},
                name: {type: 'string', example: 'Iphone 10'},
                price: {type: 'number', example: 49990},
                typeId: {type: 'number', example: 1},
                brandId: {type: 'number', example: 1},
                img: {type: 'string', example: '1.jpg'}
            }
        }})
    @ApiResponse({status: 404, description: 'Такого товара не существует'})
    @Delete('/:deviceId')
    deleteDevice(@Param('deviceId') deviceId: number) {
        return this.deviceService.deleteDevice(deviceId);
    }

    @ApiOperation({summary: 'Обновить товар'})
    @ApiResponse({status: 200, type: Device})
    @ApiResponse({status: 404, description: 'Товар не найден или товар с таким названием уже существует или ' +
            'бренда с таким идентификатором не существует или типа с таким идентификатором не существует'})
    @Patch('/:deviceId')
    @UseInterceptors(FileInterceptor('img'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                name: {type: 'string', example: 'Iphone 10'},
                price:{type: 'number', example: 49990},
                img: {type: 'string', format: 'binary'},
                typeId: {type: 'number', example: 1},
                brandId: {type: 'number', example: 1}
            },
        },
    })
    updateDevice(@Param('deviceId') deviceId: number,
                 @Body() updateDeviceDto: UpdateDeviceDto,
                 @UploadedFile() img: OptionalFileDto) {
        if (!img) {
            return this.deviceService.updateDevice(deviceId, updateDeviceDto);
        }
        return this.deviceService.updateDevice(deviceId, updateDeviceDto, img);
    }



    @ApiOperation({summary: 'Оценить товар'})
    @ApiResponse({status: 200, type: Rating})
    @ApiResponse({status: 404, description: 'Данный товар уже оценен или пользователь или товар не найдены'})
    @HttpCode(200)
    @Post('/:deviceId/rate')
    rateDevice(@Param('deviceId') deviceId: number,
                @Body() rateDto: CreateRatingDto) {
        return this.ratingService.createRating(deviceId, rateDto);
    }

    @ApiOperation({summary: 'Удалить оценку'})
    @ApiResponse({status: 200, type: Rating})
    @ApiResponse({status: 404, description: 'Данный товар еще не оценен или пользователь или товар не найдены'})
    @Delete('/:deviceId/rate')
    unRateDevice(@Param('deviceId') deviceId: number,
               @Body() rateDto: DeleteRatingDto) {
        return this.ratingService.deleteRating(deviceId, rateDto);
    }

    @ApiOperation({summary: 'Обновить оценку'})
    @ApiResponse({status: 404, description: 'Данный товар еще не оценен или пользователь или товар не найдены'})
    @ApiResponse({status: 200, type: Rating})
    @Patch('/:deviceId/rate')
    reRateDevice(@Param('deviceId') deviceId: number,
                 @Body() rateDto: UpdateRatingDto) {
        return this.ratingService.updateRating(deviceId, rateDto);
    }

}
