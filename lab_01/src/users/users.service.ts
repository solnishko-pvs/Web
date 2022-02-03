import {forwardRef, HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {BasketService} from "../basket/basket.service";
import {DeleteUserDto} from "./dto/delete-user.dto";
import {RatingService} from "../rating/rating.service";
import {DeviceService} from "../device/device.service";
import {Role} from "../roles/roles.model";
import {Basket} from "../basket/basket.model";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                private roleService: RolesService,
                private basketService: BasketService,
                @Inject(forwardRef(() => RatingService)) private ratingService: RatingService,
                @Inject(forwardRef(() => DeviceService)) private deviceService: DeviceService) {}


    async createUser(dto: CreateUserDto) {
        const check = await this.getUserByEmail(dto.email);
        if (check)
        {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST);
        }
        const user = await this.userRepository.create(dto);
        await this.basketService.createBasket({userId: user.id});
        const role = await this.roleService.getRoleByValue("USER");

        if (!role) {
            throw new HttpException('Такой роли не существует', HttpStatus.NOT_FOUND);
        }
        await user.$set('roles', [role.id]);
        user.roles = [role]

        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({include: [{model: Role, as:'roles', attributes: ['value'], through: {attributes:[]}}, Basket]});
        return users;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}});
        return user;
    }

    async getUserById(id: number) {
        const user = await this.userRepository.findOne({where: {id}});
        return user;
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (user && role) {


            await user.$add('roles', role.id);
            return dto;
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
    }

    async removeRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (user && role) {
            await user.$remove('roles', role.id);
            return dto;
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
    }

    async ban(dto: BanUserDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }
        user.banned = true;
        user.banReason = dto.banReason;
        await user.save();
        return;
    }

    async deleteUser(dto: DeleteUserDto) {
        const user = await this.getUserByEmail(dto.email);
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }
        await this.basketService.deleteBasket(user.id);
        const ratings = await this.ratingService.getRatingByUserId(user.id);
        await user.destroy();
        for (let rating of ratings) {
            const newRating = await this.ratingService.calculateRating(rating.deviceId);
            const device = await this.deviceService.getDeviceById(rating.deviceId);
            device.rating = newRating;
            await device.save();
        }
    }
}

