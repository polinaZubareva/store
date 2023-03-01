import { Model, Sequelize, DataTypes } from 'sequelize';
import Basket, { BasketInstance } from './basket';
import Product, { ProductInstance } from './product';
import { db } from '../db';

export default class ProductsInBaskets extends Model {
  basket_id!: number;
  product_id!: number;
  product_count!: number;
}

export const ProductsInBasketInstance = (sequelize: Sequelize) => {
  BasketInstance(db);
  ProductInstance(db);

  ProductsInBaskets.init(
    {
      // basket_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
      // product_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
      product_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { sequelize, tableName: 'basket_products', timestamps: false }
  );

  Basket.hasMany(ProductsInBaskets);
  ProductsInBaskets.belongsTo(Basket, {
    foreignKey: 'basket_id',

    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  });

  Product.hasMany(ProductsInBaskets);
  ProductsInBaskets.belongsTo(Product, {
    foreignKey: 'product_id',

    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  });

  ProductsInBaskets.sync();
  // Product.sync();
  // Basket.sync();
};
