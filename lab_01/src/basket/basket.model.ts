import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasOne, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {Device} from "../device/device.model";
import {BasketDevice} from "../device/basket-device.model";
import {Exclude} from "class-transformer";

interface BasketCreationAttrs {
    userId: number;
}

@Table({tableName: 'baskets', createdAt: false, updatedAt: false})
export class Basket extends Model <Basket, BasketCreationAttrs> {

    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 1, description: 'Идентификатор пользователя'})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, unique: true, allowNull: false})
    userId: number;

    @BelongsTo(() => User)
    user: User

    @ApiProperty({description: 'Список товаров в корзине', type: () => [Device]})
    @BelongsToMany(() => Device, () => BasketDevice)
    devices: Device[]
}