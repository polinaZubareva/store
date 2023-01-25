import { DataTypes, Model, Sequelize } from '../db';
import Basket from './basket';
import Product from './product';

export default class ProductsInBaskets extends Model {
  basket_id!: number;
  product_id!: number;
  product_count!: number;
}

export const ProductsInBasketInstance = (sequelize: Sequelize) => {
  ProductsInBaskets.init(
    {
      basket_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { sequelize, tableName: 'productsInBasket', timestamps: false }
  );

  //
  //
  //
  Basket.hasMany(ProductsInBaskets, {
    foreignKey: {
      name: 'basket_id',
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  });
  ProductsInBaskets.belongsTo(Basket);

  //
  Product.hasMany(ProductsInBaskets, {
    foreignKey: {
      name: 'product_id',
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  });
  ProductsInBaskets.belongsTo(Product);

  ProductsInBaskets.sync();
};
