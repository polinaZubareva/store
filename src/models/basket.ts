import { DataTypes, Model, Sequelize } from '../db';
import Client from './client';

export default class Basket extends Model {
  id!: number;
  user_id!: number;
}

export const BasketInstance = (sequelize: Sequelize) => {
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
