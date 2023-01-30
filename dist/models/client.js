"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientInstance = void 0;
const db_1 = require("../db");
class Client extends db_1.Model {
}
exports.default = Client;
const ClientInstance = (sequelize) => {
    Client.init({
        id: {
            type: db_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: db_1.DataTypes.STRING,
        },
        birthdate: {
            type: db_1.DataTypes.DATEONLY,
        },
        login: {
            type: db_1.DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: db_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'clients',
        timestamps: false,
    });
    Client.sync();
};
exports.ClientInstance = ClientInstance;
