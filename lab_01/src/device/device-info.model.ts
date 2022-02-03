import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Device} from "./device.model";

interface DeviceInfoCreationAttrs {
    title: string;
    description: string;
    deviceId: number;
}

@Table({tableName: 'deviceInfo', createdAt: false, updatedAt: false})
export class DeviceInfo extends Model <DeviceInfo, DeviceInfoCreationAttrs> {

    @ApiProperty({example: 1, description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Оперативная память', description: 'Характеристика'})
    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @ApiProperty({example: '8 Гб', description: 'Значение характеристики'})
    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @ApiProperty({example: 1, description: 'Идентификатор товара'})
    @ForeignKey(() => Device)
    @Column({type: DataType.INTEGER, allowNull: false})
    deviceId: number;

    @BelongsTo(() => Device)
    device: Device;

}