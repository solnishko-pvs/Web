import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, IsString} from "class-validator";

export class UpdateRoleDto {

    @ApiProperty({example: 'USER', description: 'Название роли', required: false})
    @IsString({message: 'Должно быть строкой'})
    @IsOptional()
    readonly value?: string;

    @ApiProperty({example: 'Обычный пользователь', description: 'Описание роли', required: false})
    @IsString({message: 'Должно быть строкой'})
    @IsOptional()
    readonly description?: string;

}