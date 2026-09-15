import { Sequelize } from 'sequelize';

// import { Sequelize } from '@sequelize/core';
// import { PostgresDialect } from '@sequelize/postgres';


const sequelize: Sequelize = new Sequelize( "BankingSystemDB", "admin", "admin", {
  dialect: 'postgres',
  // database: 'BankingSystemDB',
  // user: 'admin',
  // password: 'admin',
  host: 'localhost',
  port: 5432,
  logging: false
});

export default sequelize;