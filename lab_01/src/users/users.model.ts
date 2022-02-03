import {BelongsToMany, Column, DataType, HasMany, HasOne, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {Basket} from "../basket/basket.model";
import {Rating} from "../rating/rating.model";




interface UserCreationAttrs {
    email: string;
    password: string;
}

@Table({tableName: 'users', createdAt: false, updatedAt: false})
export class User extends Model <User, UserCreationAttrs> {

    @ApiProperty({example: 1, description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'example@mail.com', description: 'Адрес электронной почты'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: 'qwerty', description: 'Пароль'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: 'true', description: 'Заблокирован или нет'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @ApiProperty({example: 'Spam', description: 'Причина блокировки'})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;

    @ApiProperty({type: [Role], description: 'Роли пользователя'})
    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

    @ApiProperty({type: Basket, description: 'Корзина пользователя'})
    @HasOne(() => Basket)
    basket: Basket;

    @HasMany(() => Rating)
    rating: Rating[];

}