import {BelongsTo, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Device} from "./device.model";
import {Exclude} from "class-transformer";

interface BrandInfoCreationAttrs {
    name: string;
}

@Table({tableName: 'brand', createdAt: false, updatedAt: false})
export class Brand extends Model <Brand, BrandInfoCreationAttrs> {

    @ApiProperty({example: 1, description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Apple', description: 'Название бренда'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;

    @HasMany(() => Device)
    device: Device[];
}