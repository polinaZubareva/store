"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientInstance = void 0;
const sequelize_1 = require("sequelize");
class Client extends sequelize_1.Model {
}
exports.default = Client;
const ClientInstance = (sequelize) => {
    Client.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
        },
        birthdate: {
            type: sequelize_1.DataTypes.DATEONLY,
        },
        login: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
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
