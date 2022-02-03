import {forwardRef, HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Rating} from "./rating.model";
import {CreateRatingDto} from "./dto/create-rating.dto";
import {UsersService} from "../users/users.service";
import {DeviceService} from "../device/device.service";
import {DeleteRatingDto} from "./dto/delete-rating.dto";
import {UpdateRatingDto} from "./dto/update-rating.dto";

@Injectable()
export class RatingService {

    constructor(@InjectModel(Rating) private ratingRepository: typeof Rating,
                @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
                @Inject(forwardRef(() => DeviceService)) private deviceService: DeviceService) {}

    async createRating(deviceId:number, dto: CreateRatingDto) {
        const user = await this.usersService.getUserById(dto.userId);
        const device = await this.deviceService.getDeviceById(deviceId);
        if (user && device) {
            const check = await this.getRatingByDeviceIdAndUserId(deviceId, dto.userId);
            if (check) {
                throw new HttpException('Данный товар уже оценен', HttpStatus.NOT_FOUND);
            }
            const rating = await this.ratingRepository.create({rating: dto.rating, userId:  dto.userId, deviceId:deviceId});
            device.rating = await this.calculateRating(device.id);
            await device.save();
            return rating;
        }
        throw new HttpException('Пользователь или товар не найдены', HttpStatus.NOT_FOUND);
    }

    async getRatingByUserId(userId: number) {
        const userRatings = await this.ratingRepository.findAll({where: {userId}});
        return userRatings;
    }

    async getRatingByDeviceId(deviceId: number) {
        const deviceRatings = await this.ratingRepository.findAll({where: {deviceId}});
        return deviceRatings;
    }

    async getAllRatings() {
        const ratings = await this.ratingRepository.findAll();
        return ratings;
    }

    private async getRatingByDeviceIdAndUserId(deviceId: number, userId: number) {
        const Rating = await this.ratingRepository.findOne({where: {deviceId, userId}});
        return Rating;
    }

    async deleteRating(deviceId: number, dto: DeleteRatingDto) {

        const user = await this.usersService.getUserById(dto.userId);
        const device = await this.deviceService.getDeviceById(deviceId);
        if (user && device) {
            const rating = await this.getRatingByDeviceIdAndUserId(deviceId, dto.userId);
            if (!rating) {
                throw new HttpException('Данный товар еще не оценен', HttpStatus.NOT_FOUND);
            }
            await rating.destroy()
            device.rating = await this.calculateRating(device.id);
            await device.save();
            return rating;
        }
        throw new HttpException('Пользователь или товар не найдены', HttpStatus.NOT_FOUND);

    }

    async updateRating(deviceId: number, dto: UpdateRatingDto) {
        const user = await this.usersService.getUserById(dto.userId);
        const device = await this.deviceService.getDeviceById(deviceId);
        if (user && device) {
            const rating = await this.getRatingByDeviceIdAndUserId(deviceId, dto.userId);
            if (!rating) {
                throw new HttpException('Данный товар еще не оценен', HttpStatus.NOT_FOUND);
            }
            await rating.update({rating: dto.rating})
            device.rating = await this.calculateRating(device.id);
            await device.save();
            return await this.getRatingByDeviceIdAndUserId(deviceId, dto.userId);
        }
        throw new HttpException('Пользователь или товар не найдены', HttpStatus.NOT_FOUND);

    }

    async calculateRating(deviceId:number) {
        const ratings = await this.getRatingByDeviceId(deviceId);
        if (ratings) {
            let avgRating = 0;
            for (let rating of ratings) {
                avgRating += rating.rating;
            }
            avgRating /= ratings.length;
            return avgRating;
        }
        return null;
    }

}
