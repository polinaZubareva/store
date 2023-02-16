"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasketInstance = void 0;
const client_1 = __importDefault(require("./client"));
const sequelize_1 = require("sequelize");
class Basket extends sequelize_1.Model {
}
exports.default = Basket;
const BasketInstance = (sequelize) => {
    Basket.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        user_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
    }, { sequelize, tableName: 'baskets', timestamps: false });
    client_1.default.hasOne(Basket, {
        foreignKey: {
            name: 'user_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
    Basket.belongsTo(client_1.default);
    Basket.sync();
};
exports.BasketInstance = BasketInstance;
