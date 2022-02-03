import {forwardRef, HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Brand} from "./brand.model";
import {CreateBrandDto} from "./dto/create-brand.dto";
import {UpdateBrandDto} from "./dto/update-brand.dto";
import {Type} from "./type.model";
import {UpdateTypeDto} from "./dto/update-type.dto";
import {CreateTypeDto} from "./dto/create-type.dto";
import {DeviceInfo} from "./device-info.model";
import {CreateDeviceInfoDto} from "./dto/create-device-info.dto";
import {UpdateDeviceInfoDto} from "./dto/update-device-info.dto";
import {Device} from "./device.model";
import {CreateDeviceDto} from "./dto/create-device.dto";
import {UpdateDeviceDto} from "./dto/update-device.dto";
import {RatingService} from "../rating/rating.service";
import {CreateRatingDto} from "../rating/dto/create-rating.dto";
import {FilesService} from "../files/files.service";

@Injectable()
export class DeviceService {

    constructor(@InjectModel(Brand) private brandRepository: typeof Brand,
                @InjectModel(Type) private typeRepository: typeof Type,
                @InjectModel(DeviceInfo) private deviceInfoRepository: typeof DeviceInfo,
                @InjectModel(Device) private deviceRepository: typeof Device,
                @Inject(forwardRef(() => RatingService)) private ratingService: RatingService,
                private filesService: FilesService) {

    }

    async createBrand(dto: CreateBrandDto) {
        const check = await this.getBrandByName(dto.name);
        if (check) {
            throw new HttpException('Данный бренд уже существует', HttpStatus.NOT_FOUND)
        }
        const brand = await this.brandRepository.create(dto);
        return brand;
    }

    async getBrandByBrandId(id: number) {
        const brand = await this.brandRepository.findByPk(id);
        return brand;
    }

    private async getBrandByName(name: string) {
        const brand = await this.brandRepository.findOne({where: {name}});
        return brand;
    }

    async getAllBrands() {
        const brands = await this.brandRepository.findAll();
        return brands;
    }

    async deleteBrand(id: number) {
        const brand = await this.getBrandByBrandId(id);
        if (!brand) {
            throw new HttpException('Бренд не найден', HttpStatus.NOT_FOUND);
        }
        await brand.destroy()
        return brand;
    }

    async updateBrand(id: number, dto: UpdateBrandDto) {
        const brandById = await this.getBrandByBrandId(id);
        if (!brandById) {
            throw new HttpException('Бренд не найден', HttpStatus.NOT_FOUND);
        }
        const brandByName = await this.getBrandByName(dto.name);
        if (brandByName) {
            throw new HttpException('Бренд с таким именем уже существует', HttpStatus.NOT_FOUND);
        }

        await brandById.update({name: dto.name})

        return brandById;
    }



    async createType(dto: CreateTypeDto) {
        const check = await this.getTypeByName(dto.name);
        if (check) {
            throw new HttpException('Данный тип уже существует', HttpStatus.NOT_FOUND)
        }
        const type = await this.typeRepository.create(dto);
        return type;
    }

    async getTypeByTypeId(id: number) {
        const type = await this.typeRepository.findByPk(id);
        return type;
    }

    private async getTypeByName(name: string) {
        const type = await this.typeRepository.findOne({where: {name}});
        return type;
    }

    async getAllTypes() {
        const types = await this.typeRepository.findAll();
        return types;
    }

    async deleteType(id: number) {
        const type = await this.getTypeByTypeId(id);
        if (!type) {
            throw new HttpException('Тип не найден', HttpStatus.NOT_FOUND);
        }
        await type.destroy()
        return type;
    }

    async updateType(id: number, dto: UpdateTypeDto) {
        const typeById = await this.getTypeByTypeId(id);
        if (!typeById) {
            throw new HttpException('Тип не найден', HttpStatus.NOT_FOUND);
        }
        const typeByName = await this.getTypeByName(dto.name);
        if (typeByName) {
            throw new HttpException('Тип с таким именем уже существует', HttpStatus.NOT_FOUND);
        }

        await typeById.update({name: dto.name})

        return typeById;
    }



    async createDeviceInfo(dto: CreateDeviceInfoDto) {
        const checkDevice = await this.getDeviceById(dto.deviceId);
        if (!checkDevice) {
            throw new HttpException('Такого товара не существует', HttpStatus.NOT_FOUND)
        }
        const check = await this.getDeviceInfoByDeviceIdAndTitle(dto.deviceId, dto.title);
        //console.log(check);
        if (check) {
            throw new HttpException('У данного товара уже есть такая характеристика', HttpStatus.NOT_FOUND)
        }
        const deviceInfo = await this.deviceInfoRepository.create(dto);
        return deviceInfo;
    }

    private async getDeviceInfoByDeviceIdAndTitle(deviceId: number, title: string) {
        const deviceInfo = await this.deviceInfoRepository.findOne({where: {deviceId, title}});
        return deviceInfo;
    }

    private async getDeviceInfoByDeviceInfoId(id: number) {
        const deviceInfo = await this.deviceInfoRepository.findByPk(id);
        return deviceInfo;
    }

    async getDeviceInfoByDeviceId(deviceId: number) {
        const deviceInfo = await this.deviceInfoRepository.findAll({where: {deviceId}});
        return deviceInfo;
    }

    async getAllDeviceInfos() {
        const deviceInfos = await this.deviceInfoRepository.findAll();
        return deviceInfos;
    }

    async deleteDeviceInfo(id: number) {
        const deviceInfo = await this.getDeviceInfoByDeviceInfoId(id);
        if (!deviceInfo) {
            throw new HttpException('Запись не найдена', HttpStatus.NOT_FOUND);
        }
        await deviceInfo.destroy()
        return deviceInfo;
    }

    async updateDeviceInfo(deviceId: number, title: string, dto: UpdateDeviceInfoDto) {
        const deviceInfo = await this.getDeviceInfoByDeviceIdAndTitle(deviceId, title);
        if (!deviceInfo) {
            throw new HttpException('Запись не найдена', HttpStatus.NOT_FOUND);
        }

        await deviceInfo.update(dto)

        return deviceInfo;
    }



    async createDevice(dto: CreateDeviceDto, image: any) {
        const checkDevice = await this.getDeviceByName(dto.name);
        if (checkDevice) {
            throw new HttpException('Товар с таким названием уже существует', HttpStatus.NOT_FOUND)
        }

        const checkBrand = await this.getBrandByBrandId(dto.brandId);
        if (!checkBrand) {
            throw new HttpException('Бренда с таким идентификатором не существует', HttpStatus.NOT_FOUND)
        }

        const checkType = await this.getTypeByTypeId(dto.typeId);
        if (!checkType) {
            throw new HttpException('Типа с таким идентификатором не существует', HttpStatus.NOT_FOUND)
        }

        if (!image) {
            throw new HttpException('Изображение не загружено', HttpStatus.NOT_FOUND)
        }
        const fileName = await this.filesService.createFile(image);
        const device = await this.deviceRepository.create({...dto, img: fileName});
        return device;
    }

    async getDeviceById(id: number) {
        const device = await this.deviceRepository.findByPk(id, {include: {all: true}});
        if (!device) {
            throw new HttpException('Такого товара не существует', HttpStatus.NOT_FOUND)
        }
        return device;
    }

    private async getDeviceByName(name: string) {
        const device = await this.deviceRepository.findOne({where: {name}, include: {all: true}});
        return device;
    }

    async getAllDevices() {
        const devices = await this.deviceRepository.findAll({include: {all: true}});
        return devices;
    }

    async deleteDevice(id: number) {
        const deviceInfos = await this.getDeviceInfoByDeviceId(id)
        if (deviceInfos) {
            deviceInfos.forEach((value) => {value.destroy()})
        }
        const device = await this.getDeviceById(id);
        if (!device) {
            throw new HttpException('Такого товара не существует', HttpStatus.NOT_FOUND)
        }
        await this.filesService.deleteFile(device.img);
        await device.destroy()
        return device;
    }

    async updateDevice(id: number, dto: UpdateDeviceDto, image?: any) {
        const deviceById = await this.getDeviceById(id);
        if (!deviceById) {
            throw new HttpException('Товар не найден', HttpStatus.NOT_FOUND);
        }
        if (dto.name) {
            const deviceByName = await this.getDeviceByName(dto.name);
            if (deviceByName) {
                throw new HttpException('Товар с таким названием уже существует', HttpStatus.NOT_FOUND);
            }
        }

        if (dto.brandId || dto.brandId == 0) {
            const brand = await this.getBrandByBrandId(dto.brandId);
            if (!brand || dto.brandId == 0) {
                throw new HttpException('Бренда с таким идентификатором не существует', HttpStatus.NOT_FOUND);
            }
        }

        if (dto.typeId || dto.typeId == 0) {
            const type = await this.getTypeByTypeId(dto.typeId);
            if (!type) {
                throw new HttpException('Типа с таким идентификатором не существует', HttpStatus.NOT_FOUND);
            }
        }

        if (image) {
            await this.filesService.deleteFile(deviceById.img);
            const fileName = await this.filesService.createFile(image);
            await deviceById.update({...dto, img: fileName})
        }
        console.log(dto)
        await deviceById.update(dto);

        return await this.getDeviceById(deviceById.id);
    }



    //
    // async rateDevice(dto: CreateRatingDto) {
    //
    // }
    //
    // async reRateDevice() {
    //
    // }
    //
    // async deleteRateDevice() {
    //
    // }

}
