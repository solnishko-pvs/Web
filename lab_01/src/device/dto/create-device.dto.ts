import {ApiProperty} from "@nestjs/swagger";
import {IsInt, IsNumber, IsString} from "class-validator";

export class CreateDeviceDto {

    @ApiProperty({example: 'Iphone 13', description: 'Название товара'})
    @IsString({message: 'Должно быть строкой'})
    readonly name: string;

    @ApiProperty({example: 49990, description: 'Цена товара'})
    @IsNumber({}, {message: 'Должно быть целым числом'})
    readonly price: number;

    @ApiProperty({example: 1, description: 'Идентификатор бренда'})
    @IsInt({message: 'Должно быть целым числом'})
    readonly brandId: number;

    @ApiProperty({example: 1, description: 'Идентификатор типа'})
    @IsInt({message: 'Должно быть целым числом'})
    readonly typeId: number;

}