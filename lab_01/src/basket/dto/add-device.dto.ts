import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsInt, IsNumber, IsString} from "class-validator";

export class AddDeviceDto {

    @ApiProperty({example: 'example@mail.com', description: 'Адрес электронной почты'})
    @IsString({message: 'Должно быть числом'})
    @IsEmail({},{message: 'Некорректный Email'})
    readonly userEmail: string;

    @ApiProperty({example: 1, description: 'Идентификатор товара'})
    @IsInt({message: 'Должно быть целым числом'})
    readonly deviceId: number;
}