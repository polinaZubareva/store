"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryInstance = void 0;
const db_1 = require("../db");
class Category extends db_1.Model {
}
exports.default = Category;
const CategoryInstance = (sequelize) => {
    Category.init({
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
        parent_id: {
            type: db_1.DataTypes.INTEGER,
        },
    }, {
        sequelize,
        tableName: 'categories',
        timestamps: false,
    });
    Category.hasOne(Category, {
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
        foreignKey: {
            name: 'parent_id',
        },
    });
    Category.belongsTo(Category);
    Category.sync();
};
exports.CategoryInstance = CategoryInstance;
