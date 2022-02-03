import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class DeleteRoleDto {
    @ApiProperty({example: 'USER', description: 'Название роли'})
    @IsString({message: 'Должно быть строкой'})
    readonly value: string;
}