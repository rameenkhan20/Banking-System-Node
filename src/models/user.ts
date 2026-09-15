import { Model, DataTypes, Sequelize } from 'sequelize';

export class User extends Model {
    public id: number | undefined;
    public role: string | undefined;
    public name: string | undefined;
    public email: string | undefined;
    public hashPassword: string | undefined;
}

export function userModel(sequelize: Sequelize) {
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        role:{
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        hashedPassword: {
            type: DataTypes.STRING(64),
            allowNull: false
        }},
    { sequelize, modelName: 'user' },
    ); 
}
