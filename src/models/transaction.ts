import { DataTypes } from '@sequelize/core';
import sequelize from '../config/database.ts';
import {Account} from './account.ts';

export const Transaction = sequelize.define("Transaction" , {
    //model attributes
    id: {   //transtion ID 
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    senderAccountId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    receiverAccountId: {
        type: DataTypes.UUID,
        allowNull: true
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
});

Account.hasMany(Transaction, {foreignKey: "senderAccountId"});
Transaction.belongsTo(Account, {foreignKey: "senderAccountId"});

console.log('Transaction model defined:', !!Transaction); // 👈 add this
