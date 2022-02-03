import {Body, Controller, HttpCode, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";


@ApiTags('Авторизация')
@Controller('/auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @ApiOperation({summary: 'Авторизация'})
    @ApiResponse({status: 401, description: 'Некорректный email или пароль'})
    @ApiResponse({status: 200, type: String, description: 'Сгенерированный JWT токен'})
    @HttpCode(200)
    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }

    @ApiOperation({summary: 'Регистрация'})
    @ApiResponse({status: 400, description: 'Пользователь с таким email существует'})
    @ApiResponse({status: 200, type: String, description: 'Сгенерированный JWT токен'})
    @HttpCode(200)

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }
}
