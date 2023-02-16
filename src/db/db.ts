import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

config();

const dbName: string = process.env.DB_NAME!;
const dbUser: string = process.env.DB_USER!;
const dbPassword: string = process.env.DB_PASSWORD!;
const dbPort: number = +process.env.DB_PORT!;
const dbHost: string = process.env.DB_HOST!;

const db = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: 'postgres',
  pool: {
    max: 3,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    underscored: true, //  snake_case вместо camelCase для полей
  },
});

export { db };
