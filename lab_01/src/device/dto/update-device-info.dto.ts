import {ApiProperty} from "@nestjs/swagger";
import {IsInt, IsNumber, IsOptional, IsString} from "class-validator";

export class UpdateDeviceInfoDto {

    @ApiProperty({example: 1, description: 'Идентификатор товара', required: false})
    @IsInt({message: 'Должно быть целым числом'})
    @IsOptional()
    readonly deviceId?: number;

    @ApiProperty({example: 'Оперативная память', description: 'Характеристика', required: false})
    @IsString({message: 'Должно быть строкой'})
    @IsOptional()
    readonly title?: string;

    @ApiProperty({example: '8 Гб', description: 'Описание характеристики', required: false})
    @IsString({message: 'Должно быть строкой'})
    @IsOptional()
    readonly description?: string;

}