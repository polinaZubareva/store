"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderInstance = exports.orderStatus = void 0;
const sequelize_1 = require("sequelize");
const client_1 = __importDefault(require("./client"));
var orderStatus;
(function (orderStatus) {
    orderStatus[orderStatus["assembling"] = 0] = "assembling";
    orderStatus[orderStatus["delivery"] = 1] = "delivery";
    orderStatus[orderStatus["on receipt"] = 2] = "on receipt";
})(orderStatus = exports.orderStatus || (exports.orderStatus = {}));
class Order extends sequelize_1.Model {
}
exports.default = Order;
const OrderInstance = (sequelize) => {
    Order.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        user_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        order_status: {
            type: sequelize_1.DataTypes.ENUM('assembling', 'delivery', 'on receipt'),
            allowNull: false,
        },
    }, { sequelize, tableName: 'orders', timestamps: false });
    client_1.default.hasMany(Order, {
        onDelete: 'CASCADE',
        foreignKey: {
            name: 'user_id',
        },
    });
    Order.belongsTo(client_1.default);
    Order.sync();
};
exports.OrderInstance = OrderInstance;
