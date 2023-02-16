"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsInOrderInstance = void 0;
const sequelize_1 = require("sequelize");
const order_1 = __importDefault(require("./order"));
class ProductsInOrders extends sequelize_1.Model {
}
exports.default = ProductsInOrders;
const ProductsInOrderInstance = (sequelize) => {
    ProductsInOrders.init({
        order_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        products_id: {
            type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.INTEGER),
            allowNull: false,
        },
        products_count: {
            type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.INTEGER),
            allowNull: false,
        },
    }, { sequelize, tableName: 'productsInOrder', timestamps: false });
    order_1.default.hasMany(ProductsInOrders, {
        foreignKey: {
            name: 'order_id',
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
    });
    ProductsInOrders.belongsTo(order_1.default);
    ProductsInOrders.sync();
};
exports.ProductsInOrderInstance = ProductsInOrderInstance;
