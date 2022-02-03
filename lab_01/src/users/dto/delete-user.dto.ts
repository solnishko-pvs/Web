import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class DeleteUserDto {
    @ApiProperty({example: 'example@mail.com', description: 'Адрес электронной почты'})
    @IsString({message: 'Должно быть строкой'})
    @IsEmail({}, {message: 'Некорректный Email'})
    readonly email: string;
}