import {ApiProperty} from "@nestjs/swagger";
import {IsInt, IsOptional, Max, Min} from "class-validator";

export class UpdateRatingDto {

    @ApiProperty({example: 1, description: 'Идентификатор товара'})
    @IsInt( {message: 'Должно быть целым числом'})
    @Min(1)
    @Max(5)
    readonly rating: number;

    @ApiProperty({example: 1, description: 'Идентификатор пользователя'})
    @IsInt({message: 'Должно быть целым числом'})
    readonly userId: number;
}