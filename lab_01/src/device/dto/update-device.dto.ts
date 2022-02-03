import {ApiProperty} from "@nestjs/swagger";
import {IsInt, IsNumber, IsOptional, IsString} from "class-validator";

export class UpdateDeviceDto {

    @ApiProperty({example: 'Iphone 13', description: 'Название товара'})
    @IsString({message: 'Должно быть строкой'})
    @IsOptional()
    readonly name?: string;

    @ApiProperty({example: 49990, description: 'Цена товара'})
    @IsNumber({}, {message: 'Должно быть целым числом'})
    @IsOptional()
    readonly price?: number;

    @ApiProperty({example: 1, description: 'Идентификатор бренда'})
    @IsInt({message: 'Должно быть целым числом'})
    @IsOptional()
    readonly brandId?: number;

    @ApiProperty({example: 1, description: 'Идентификатор типа'})
    @IsInt({message: 'Должно быть целым числом'})
    @IsOptional()
    readonly typeId?: number;

}