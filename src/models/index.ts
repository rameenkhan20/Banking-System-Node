import sequelize from "../config/database.ts";
import { User , userModel } from "./user.ts";
import { Account, accountModel } from "./account.ts";
import { Transaction, transactionModel } from "./transaction.ts";


userModel(sequelize);
accountModel(sequelize);
transactionModel(sequelize);

User.hasMany(Account, { foreignKey: 'ownerId' });
Account.belongsTo(User, { foreignKey: 'ownerId' });

Account.hasMany(Transaction, {foreignKey: "senderAccountId"});
Transaction.belongsTo(Account, {foreignKey: "senderAccountId"});

export {
    sequelize, User, Account, Transaction
}

