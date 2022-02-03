import {ApiProperty} from "@nestjs/swagger";
import {IsInt} from "class-validator";

export class CreateBasketDto {
    @ApiProperty({example: 1, description: 'Идентификатор пользователя'})
    @IsInt({message: 'Должно быть целым числом'})
    readonly userId: number;
}