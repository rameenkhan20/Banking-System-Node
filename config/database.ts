import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';

const sequelize = new Sequelize({
  dialect: PostgresDialect,
  database: 'BankingSystemDB',
  user: 'rameenkhan20',
  password: '444321',
  host: 'localhost',
  port: 5432
});

export default sequelize;