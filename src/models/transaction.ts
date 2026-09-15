import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from '../config/database.ts';
// import {Account} from './account.ts';

export class Transaction extends Model{
    public id!: number;
    public senderAccountId!: number;
    public receiverAccountId!: number;
    public amount!: number;
    public transactionType!: string;
    public timestamp!: string;
} 

export function transactionModel(sequelize: Sequelize){
    Transaction.init({
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
    },
    {sequelize , modelName: "transaction"}
)
}