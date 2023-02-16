import { db } from '../db';
import Client, { ClientInstance } from './client';
import { DataTypes, Sequelize, Model } from 'sequelize';

export default class Basket extends Model {
  id!: number;
  user_id!: number;
}

export const BasketInstance = (sequelize: Sequelize) => {
  ClientInstance(db);
  Basket.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { sequelize, tableName: 'baskets', timestamps: false }
  );

  Client.hasOne(Basket, {
    foreignKey: {
      name: 'user_id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  Basket.belongsTo(Client);

  Basket.sync();
};
