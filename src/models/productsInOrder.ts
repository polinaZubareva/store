import { DataTypes, Model, Sequelize } from '../db';
import Order from './order';

export default class ProductsInOrders extends Model {
  order_id!: number;
  products_id!: number[];
  products_count!: number[];
}

export const ProductsInOrderInstance = (sequelize: Sequelize) => {
  ProductsInOrders.init(
    {
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      products_id: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
      },
      products_count: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
      },
    },
    { sequelize, tableName: 'productsInOrder', timestamps: false }
  );

  //
  Order.hasMany(ProductsInOrders, {
    foreignKey: {
      name: 'order_id',
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  });
  ProductsInOrders.belongsTo(Order);

  ProductsInOrders.sync();
};
