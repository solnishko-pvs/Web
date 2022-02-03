import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Device} from "../device/device.model";
import {User} from "../users/users.model";
import {ApiProperty} from "@nestjs/swagger";

interface RatingCreationAttrs {
    rating: number;
    userId: number;
    deviceId: number;
}

@Table({tableName: 'rating', createdAt: false, updatedAt: false})
export class Rating extends Model <Rating, RatingCreationAttrs> {

    @ApiProperty({example: 1, description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 4, description: 'Оценка'})
    @Column({type: DataType.INTEGER, allowNull: false, validate: {min: 1, max:5}})
    rating: number;

    @ApiProperty({example: 1, description: 'Идентификатор пользователя'})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number;

    @ApiProperty({example: 1, description: 'Идентификатор товара'})
    @ForeignKey(() => Device)
    @Column({type: DataType.INTEGER, allowNull: false})
    deviceId: number;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Device)
    device: Device;

}