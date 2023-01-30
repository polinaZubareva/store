"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsInBasketInstance = void 0;
const db_1 = require("../db");
const basket_1 = __importDefault(require("./basket"));
const product_1 = __importDefault(require("./product"));
class ProductsInBaskets extends db_1.Model {
}
exports.default = ProductsInBaskets;
const ProductsInBasketInstance = (sequelize) => {
    ProductsInBaskets.init({
        basket_id: {
            type: db_1.DataTypes.INTEGER,
            allowNull: false,
        },
        product_id: {
            type: db_1.DataTypes.INTEGER,
            allowNull: false,
        },
        product_count: {
            type: db_1.DataTypes.INTEGER,
            allowNull: false,
        },
    }, { sequelize, tableName: 'productsInBasket', timestamps: false });
    basket_1.default.hasMany(ProductsInBaskets, {
        foreignKey: {
            name: 'basket_id',
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
    });
    ProductsInBaskets.belongsTo(basket_1.default);
    product_1.default.hasMany(ProductsInBaskets, {
        foreignKey: {
            name: 'product_id',
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
    });
    ProductsInBaskets.belongsTo(product_1.default);
    ProductsInBaskets.sync();
};
exports.ProductsInBasketInstance = ProductsInBasketInstance;
