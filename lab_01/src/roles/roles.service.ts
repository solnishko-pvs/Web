import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {Role} from "./roles.model";
import {CreateRoleDto} from "./dto/create-role.dto";
import {DeleteRoleDto} from "./dto/delete-role.dto";
import {UpdateRoleDto} from "./dto/update-role.dto";


@Injectable()
export class RolesService {

    constructor(@InjectModel(Role) private roleRepository: typeof Role) {

    }

    async createRole(dto: CreateRoleDto) {
        const check = await this.getRoleByValue(dto.value);
        if (check) {
            throw new HttpException('Такая роль уже существует', HttpStatus.NOT_FOUND);
        }
        const role = await this.roleRepository.create(dto);
        return role;
    }

    async getRoleByValue(value: string) {
        const role = await this.roleRepository.findOne({where: {value}});
        return role;
    }

    async getAllRoles() {
        const roles = await this.roleRepository.findAll();
        return roles;
    }

    async deleteRole(deleteRoleDto: DeleteRoleDto) {
        const role = await this.getRoleByValue(deleteRoleDto.value);
        if (!role) {
            throw new HttpException('Такой роли не существует', HttpStatus.NOT_FOUND);
        }
        await role.destroy();
    }

    async updateRole(updateRoleDto: UpdateRoleDto, roleValue: string) {
        const role = await this.getRoleByValue(roleValue);
        if (!role) {
            throw new HttpException('Такой роли не существует', HttpStatus.NOT_FOUND);
        }

        await role.update(updateRoleDto);

        return role;
    }

}
