import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class UpdateTypeDto {
    @ApiProperty({example: 'Смартфоны', description: 'Название'})
    @IsString({message: 'Должно быть строкой'})
    readonly name: string;
}