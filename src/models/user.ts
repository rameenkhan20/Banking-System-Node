import { DataTypes } from '@sequelize/core';
import sequelize from '../config/database.ts';

export const User = sequelize.define("User" , {
    //model attributes
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
    }
})