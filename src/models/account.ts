import { DataTypes, Model, Sequelize } from 'sequelize';

export class Account extends Model{
    public ownerId!: number;
    public accountNumber!: string;
    public balance!: number;
    public accountType!: string;
}

export function accountModel(sequelize: Sequelize){
    Account.init({
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
        },
        {sequelize , modelName: "account"}
    )
}