import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, IsString} from "class-validator";

export class OptionalFileDto {

    @ApiProperty({example: '/devices/1.png', description: 'Путь до картинки товара'})
    @IsOptional()
    readonly img?: Express.Multer.File;
}