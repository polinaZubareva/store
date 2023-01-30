"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductInstance = void 0;
const db_1 = require("../db");
const category_1 = __importDefault(require("./category"));
class Product extends db_1.Model {
}
exports.default = Product;
const ProductInstance = (sequelize) => {
    Product.init({
        id: {
            type: db_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: db_1.DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: db_1.DataTypes.DECIMAL(2),
            allowNull: false,
        },
        count: {
            type: db_1.DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: db_1.DataTypes.STRING,
        },
        picture: {
            type: db_1.DataTypes.BLOB,
        },
        category_id: {
            type: db_1.DataTypes.INTEGER,
        },
    }, {
        sequelize,
        tableName: 'products',
        timestamps: false,
    });
    category_1.default.hasMany(Product, {
        onDelete: 'RESTRICT',
        foreignKey: {
            name: 'category_id',
        },
    });
    Product.belongsTo(category_1.default);
    Product.sync();
};
exports.ProductInstance = ProductInstance;
