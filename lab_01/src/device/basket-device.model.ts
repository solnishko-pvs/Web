import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Basket} from "../basket/basket.model";
import {Device} from "./device.model";

@Table({tableName: 'basket_device', createdAt: false, updatedAt: false})
export class BasketDevice extends Model <BasketDevice> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Basket)
    @Column({type: DataType.INTEGER, allowNull: false})
    basketId: number;

    @ForeignKey(() => Device)
    @Column({type: DataType.INTEGER, allowNull: false})
    deviceId: number;

    @Column({type: DataType.INTEGER, defaultValue: 1})
    deviceCnt: number;

}