import { Model, Sequelize, DataTypes } from 'sequelize';
import Order, { OrderInstance } from './order';
import { db } from '../db';

export default class ProductsInOrders extends Model {
  order_id!: number;
  products_id!: number[];
  products_count!: number[];
}

export const ProductsInOrderInstance = (sequelize: Sequelize) => {
  OrderInstance(db);

  ProductsInOrders.init(
    {
      // order_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
      products_id: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
      },
      products_count: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
      },
    },
    { sequelize, tableName: 'order_products', timestamps: false }
  );

  Order.hasMany(ProductsInOrders);
  ProductsInOrders.belongsTo(Order, {
    foreignKey: {
      name: 'order_id',
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  });

  ProductsInOrders.sync();
};
