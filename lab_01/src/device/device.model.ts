import {
    BelongsTo,
    BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    Table
} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Basket} from "../basket/basket.model";
import {DeviceInfo} from "./device-info.model";
import {Type} from "./type.model";
import {Brand} from "./brand.model";
import {BasketDevice} from "./basket-device.model";
import {Rating} from "../rating/rating.model";
import {Exclude} from "class-transformer";

interface DeviceCreationAttrs {
    name: string;
    price: number;
    img: string;
    brandId: number;
    typeId: number;

}

@Table({tableName: 'devices', createdAt: false, updatedAt: false})
export class Device extends Model <Device, DeviceCreationAttrs> {

    @ApiProperty({example: 1, description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Iphone 13', description: 'Название товара'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;

    @ApiProperty({example: 49990, description: 'Цена'})
    @Column({type: DataType.INTEGER, allowNull: false})
    price: number;

    @ApiProperty({example: 4.4, description: 'Рейтинг товара'})
    @Column({type: DataType.FLOAT, defaultValue: null})
    rating: number;

    @ApiProperty({example: '1.png', description: 'Путь до изображения'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    img: string;

    @ApiProperty({example: 1, description: 'Идентификатор бренда '})
    @ForeignKey(() => Brand)
    @Column({type: DataType.INTEGER, allowNull: false})
    brandId: number;

    @ApiProperty({example: 1, description: 'Идентификатор типа товара'})
    @ForeignKey(() => Type)
    @Column({type: DataType.INTEGER, allowNull: false})
    typeId: number;

    @ApiProperty({description: 'Корзины, в которых находится товар', type: [BasketDevice]})
    @BelongsToMany(() => Basket, () => BasketDevice)
    baskets: Basket[];

    @ApiProperty({description: 'Записи информации о товаре', type: [DeviceInfo]})
    @HasMany(() => DeviceInfo)
    deviceInfo: DeviceInfo[];

    @ApiProperty({description: 'Оценки товара', type: [Rating]})
    @HasMany(() => Rating)
    ratings: Rating[];

    @ApiProperty({description: 'Бренд', type: Brand})
    @BelongsTo(() => Brand)
    brand: Brand;

    @ApiProperty({description: 'Тип', type: Type})
    @BelongsTo(() => Type)
    type: Type;

}