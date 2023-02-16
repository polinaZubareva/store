import { Model, Sequelize, DataTypes } from 'sequelize';
import Client, { ClientInstance } from './client';
import { db } from '../db';

export enum orderStatus {
  'assembling',
  'delivery',
  'on receipt',
}

export default class Order extends Model {
  id!: number;
  user_id!: number;
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
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      order_status: {
        type: DataTypes.ENUM('assembling', 'delivery', 'on receipt'),
        allowNull: false,
      },
    },
    { sequelize, tableName: 'orders', timestamps: false }
  );

  Client.hasMany(Order, {
    onDelete: 'CASCADE',
    foreignKey: {
      name: 'user_id',
    },
  });
  Order.belongsTo(Client);

  Order.sync();
};
