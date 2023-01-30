"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sequelize = exports.Model = exports.DataTypes = exports.db = void 0;
const sequelize_1 = require("sequelize");
Object.defineProperty(exports, "Sequelize", { enumerable: true, get: function () { return sequelize_1.Sequelize; } });
Object.defineProperty(exports, "DataTypes", { enumerable: true, get: function () { return sequelize_1.DataTypes; } });
Object.defineProperty(exports, "Model", { enumerable: true, get: function () { return sequelize_1.Model; } });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbPort = +process.env.DB_PORT;
const dbHost = process.env.DB_HOST;
const db = new sequelize_1.Sequelize(dbName, dbUser, dbPassword, {
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
exports.db = db;
