import { DataTypes } from '@sequelize/core';
import sequelize from '../config/database.ts';
import { User } from './user.ts';

export const Account = sequelize.define("Account" , {
    //model attributes
    ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    accountNumber: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    balance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    accountType: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

User.hasMany(Account, { foreignKey: 'ownerId' });
Account.belongsTo(User, { foreignKey: 'ownerId' });

console.log('Account model defined:', !!Account); // 👈 add this

// export default Account;