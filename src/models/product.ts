import { Model, DataTypes, Sequelize } from 'sequelize';
import Category, { CategoryInstance } from './category';
import { db } from '../db';

export default class Product extends Model {
  id!: number;
  name!: string;
  price!: number;
  count!: number;
  description?: string;
  picture!: Blob;
  category_id!: number;
}

export const ProductInstance = (sequelize: Sequelize) => {
  CategoryInstance(db);

  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      picture: {
        type: DataTypes.BLOB,
      },
      category_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      tableName: 'products',
      timestamps: false,
    }
  );

  Category.hasMany(Product, {
    foreignKey: 'category_id',
    onDelete: 'RESTRICT',
  });
  Product.belongsTo(Category, {
    foreignKey: 'category_id',
  });

  Product.sync();
};
