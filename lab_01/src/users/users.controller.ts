import {
    Body,
    Controller,
    Delete,
    Get, HttpCode, HttpStatus,
    Patch,
    Post, Put,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {DeleteUserDto} from "./dto/delete-user.dto";
import {RemoveRoleDto} from "./dto/remove-role.dto";
//import { Response } from 'express';


@ApiTags('Пользователи')
@Controller('/users')
export class UsersController {

    constructor(private usersService: UsersService) {}


    @ApiOperation({summary: 'Получить всех пользователей'})
    @ApiResponse({status: 200, schema: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                id: {type: 'number', example: 1},
                email: {type: 'string', example: 'example@mail.com'},
                password: {type: 'string', example: '$2a$04$sH2M2Y8TkVe.pRLtnVU9EiV8BhIuA1h5CK'},
                banned: {type: 'boolean', example: false},
                banReason: {type: typeof null, example: null},
                roles: {type: 'array', items: {
                    type: 'object', properties: {
                        value: {type: 'string', example: 'USER'}
                    }
                }},
                basket: {type: 'object', properties: {
                        id: {type: 'number', example: 1},
                        userId: {type: 'number', example: 1}
                }},
            }
        }
    }
    })
    // @UseGuards(JwtAuthGuard)
    // @Roles("ADMIN")
    // @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({summary: 'Удаление пользователя'})
    @ApiResponse({status: 200})
    @ApiResponse({status: 404, description: 'Пользователь не найден'})
    @Delete()
    delete(@Body() userDto: DeleteUserDto) {
        return this.usersService.deleteUser(userDto);
    }

    @ApiOperation({summary: 'Выдать роль пользователю'})
    @HttpCode(201)
    @ApiResponse({status: 201, type: AddRoleDto})
    @ApiResponse({status: 404, description: 'Пользователь или роль не найдены'})
    // @UseGuards(JwtAuthGuard)
    // @Roles("ADMIN")
    // @UseGuards(RolesGuard)
    @Put('/role/add')
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto);
    }

    @ApiOperation({summary: 'Отнять роль у пользователя'})
    @HttpCode(201)
    @ApiResponse({status: 201, type: RemoveRoleDto})
    @ApiResponse({status: 404, description: 'Пользователь или роль не найдены'})
    @Put('/role/remove')
    removeRole(@Body() dto: RemoveRoleDto) {
        return this.usersService.removeRole(dto);
    }


    @ApiOperation({summary: 'Забанить пользователя'})
    @ApiResponse({status: 200, type: User})
    @ApiResponse({status: 404, description: 'Пользователь не найден'})
    // @UseGuards(JwtAuthGuard)
    // @Roles("ADMIN")
    // @UseGuards(RolesGuard)
    @Patch('/ban')
    ban(@Body() dto: BanUserDto) {
        return this.usersService.ban(dto);
    }
}
