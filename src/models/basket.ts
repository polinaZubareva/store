import { db } from '../db';
import Client, { ClientInstance } from './client';
import { DataTypes, Sequelize, Model } from 'sequelize';

export default class Basket extends Model {
  id!: number;
  client_id!: number;
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
      // client_id: {
      //   type: DataTypes.INTEGER,
      //   //references: { model: 'clients', key: 'id' },
      //   allowNull: false,
      // },
    },
    { sequelize, tableName: 'baskets', timestamps: false }
  );

  Client.hasOne(Basket);
  Basket.belongsTo(Client, {
    foreignKey: 'client_id',

    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Basket.sync();
};
