import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {

    @ApiProperty({example: 'example@mail.com', description: 'Адрес электронной почты'})
    @IsString({message: 'Должно быть строкой'})
    @IsEmail({}, {message: 'Некорректный Email'})
    readonly email: string;

    @ApiProperty({example: 'qwerty', description: 'Пароль'})
    @IsString({message: 'Должно быть строкой'})
    @Length(4, undefined, {message: 'Не менее 4 символов'})
    readonly password: string;
}