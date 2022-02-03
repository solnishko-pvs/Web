import {ApiProperty} from "@nestjs/swagger";
import {IsInt, IsString} from "class-validator";

export class CreateDeviceInfoDto {

    @ApiProperty({example: 1, description: 'Идентификатор товара'})
    @IsInt({message: 'Должно быть целым числом'})
    readonly deviceId: number;

    @ApiProperty({example: 'Оперативная память', description: 'Характеристика'})
    @IsString({message: 'Должно быть строкой'})
    readonly title: string;

    @ApiProperty({example: '8 Гб', description: 'Описание характеристики'})
    @IsString({message: 'Должно быть строкой'})
    readonly description: string;

}