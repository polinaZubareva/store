"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryInstance = void 0;
const sequelize_1 = require("sequelize");
class Category extends sequelize_1.Model {
}
exports.default = Category;
const CategoryInstance = (sequelize) => {
    Category.init({
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
        parent_id: {
            type: sequelize_1.DataTypes.INTEGER,
        },
    }, {
        sequelize,
        tableName: 'categories',
        timestamps: false,
    });
    Category.hasOne(Category, {
        foreignKey: {
            name: 'parent_id',
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
    });
    Category.belongsTo(Category, {
        foreignKey: {
            name: 'parent_id',
        },
    });
    Category.sync();
};
exports.CategoryInstance = CategoryInstance;
