import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class UpdateBrandDto {
    @ApiProperty({example: 'Apple', description: 'Идентификатор пользователя'})
    @IsString({message: 'Должно быть строкой'})
    readonly name: string;
}