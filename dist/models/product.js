"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductInstance = void 0;
const sequelize_1 = require("sequelize");
const category_1 = __importDefault(require("./category"));
class Product extends sequelize_1.Model {
}
exports.default = Product;
const ProductInstance = (sequelize) => {
    Product.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: sequelize_1.DataTypes.DOUBLE,
            allowNull: false,
        },
        count: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: sequelize_1.DataTypes.STRING,
        },
        picture: {
            type: sequelize_1.DataTypes.BLOB,
        },
        category_id: {
            type: sequelize_1.DataTypes.INTEGER,
        },
    }, {
        sequelize,
        tableName: 'products',
        timestamps: false,
    });
    category_1.default.hasMany(Product, {
        foreignKey: 'category_id',
        onDelete: 'RESTRICT',
    });
    Product.belongsTo(category_1.default, {
        foreignKey: 'category_id',
    });
    Product.sync();
};
exports.ProductInstance = ProductInstance;
