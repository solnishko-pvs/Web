import {BelongsTo, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Device} from "./device.model";

interface TypeInfoCreationAttrs {
    name: string;
}

@Table({tableName: 'type', createdAt: false, updatedAt: false})
export class Type extends Model <Type, TypeInfoCreationAttrs> {

    @ApiProperty({example: 1, description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Смартфоны', description: 'Название типа'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;

    @HasMany(() => Device)
    device: Device[];

}