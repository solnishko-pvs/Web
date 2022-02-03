import {IsInt, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class BanUserDto {

    @ApiProperty({example: 1, description: 'Идентификатор пользователя'})
    @IsInt({message: 'Должно быть целым числом'})
    readonly userId: number;

    @ApiProperty({example: 'Спам', description: 'Причина бана'})
    @IsString({message: 'Должно быть строкой'})
    readonly banReason: string;
}