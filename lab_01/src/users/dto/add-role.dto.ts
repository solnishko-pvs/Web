import {ApiProperty} from "@nestjs/swagger";
import {IsInt, IsNumber, IsString} from "class-validator";

export class AddRoleDto {

    @ApiProperty({example: 'USER', description: 'Значение роли'})
    @IsString({message: 'Должно быть строкой'})
    readonly value: string;

    @ApiProperty({example: 1, description: 'Идентификатор пользователя'})
    @IsInt({message: 'Должно быть целым числом'})
    readonly userId: number;
}