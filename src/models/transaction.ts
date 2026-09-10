import { DataTypes } from '@sequelize/core';
import sequelize from '../config/database.ts';

const transaction = sequelize.define("Transaction" , {
    //model attributes
    id: {
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    senderAccountId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    receiverAccountId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    transactionType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
})