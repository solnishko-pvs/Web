import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {validate} from "class-validator";
import {ValidationException} from "../exceptions/validation.exception";
import {OptionalFileDto} from "../device/dto/optionalFile.dto";


@Injectable()
export class ValidationPipe implements PipeTransform<any> {

    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        // console.log("1 ", value);
        // console.log("2 ", metadata.metatype, metadata.data);

        if (metadata.metatype == OptionalFileDto && value == undefined) {
            return undefined;
        }

        // if (metadata.data == 'optionalFile' && value == undefined)
        // {
        //     return
        // }

        // if (metadata.metatype == CreateDeviceDto) {
        //     console.log('fdhgdbfdd')
        // }

        const obj = plainToInstance(metadata.metatype, value, {enableImplicitConversion: true})
        // console.log("3 ", obj)
        const errors = await validate(obj, {expectedType: value});
        // console.log(errors);
        if(errors.length) {
            let messages = errors.map(err => {
                return `${err.property} - ${Object.values(err.constraints).join(', ')}`
            })
            throw new ValidationException(messages);
        }
        return obj;
    }

}