import { Model, Sequelize, DataTypes } from 'sequelize';
import Client, { ClientInstance } from './client';
import { db } from '../db';

export enum orderStatus {
  'assembling',
  'delivery',
  'on receipt',
  'canceled',
}

export default class Order extends Model {
  id!: number;
  client_id!: number;
  order_status!: orderStatus;
}

export const OrderInstance = (sequelize: Sequelize) => {
  ClientInstance(db);

  Order.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      // client_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
      order_status: {
        type: DataTypes.ENUM(
          'assembling',
          'delivery',
          'on receipt',
          'canceled'
        ),
        allowNull: false,
      },
    },
    { sequelize, tableName: 'orders', timestamps: false }
  );

  Client.hasMany(Order);
  Order.belongsTo(Client, {
    onDelete: 'CASCADE',
    foreignKey: 'client_id',
  });

  Order.sync();
};
