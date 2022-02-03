import {Body, Controller, Delete, Get, HttpCode, Param, Patch, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";
import {Role} from "./roles.model";
import {DeleteUserDto} from "../users/dto/delete-user.dto";
import {DeleteRoleDto} from "./dto/delete-role.dto";
import {Type} from "../device/type.model";
import {UpdateTypeDto} from "../device/dto/update-type.dto";
import {UpdateRoleDto} from "./dto/update-role.dto";

@ApiTags('Роли пользователей')
@Controller('/roles')
export class RolesController {

    constructor(private rolesService: RolesService) {}

    @ApiOperation({summary: 'Создание роли'})
    @ApiResponse({status: 404, description: 'Такая роль уже существует'})
    @HttpCode(200)
    @ApiResponse({status: 200, type: Role})
    @Post()
    create(@Body() roleDto: CreateRoleDto) {
        return this.rolesService.createRole(roleDto);
    }

    // @ApiOperation({summary: 'Получить информацию о роле по названию'})
    // @ApiResponse({status: 200, type: Role})
    // @Get('/:value')
    // getByValue(@Param('value') value: string) {
    //     return this.rolesService.getRoleByValue(value);
    // }

    @ApiOperation({summary: 'Получить информацию о всех ролях'})
    @ApiResponse({status: 200, type: [Role]})
    @Get()
    getAll() {
        return this.rolesService.getAllRoles();
    }

    @ApiOperation({summary: 'Удаление роли'})
    @ApiResponse({status: 200})
    @ApiResponse({status: 404, description: 'Такой роли не существует'})
    @Delete()
    delete(@Body() roleDto: DeleteRoleDto) {
        return this.rolesService.deleteRole(roleDto);
    }

    @ApiOperation({summary: 'Обновить роль'})
    @ApiResponse({status: 200, type: Role})
    @ApiResponse({status: 404, description: 'Такой роли не существует'})
    @Patch('/:value')
    updateRole(@Param('value') value: string,
               @Body() updateRoleDto: UpdateRoleDto) {
        return this.rolesService.updateRole(updateRoleDto, value);
    }

}
