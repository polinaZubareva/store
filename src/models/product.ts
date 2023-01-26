import { DataTypes, Model, Sequelize } from '../db';
import Category from './category';

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
        type: DataTypes.DECIMAL(2),
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
    onDelete: 'RESTRICT',
    foreignKey: {
      name: 'category_id',
    },
  });
  Product.belongsTo(Category);

  Product.sync();
};
