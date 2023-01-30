import { DataTypes, Model, Sequelize } from '../db';

export default class Client extends Model {
  id!: number;
  name?: string;
  birthdate?: Date;
  login!: string;
  password!: string;
}

export const ClientInstance = (sequelize: Sequelize) => {
  Client.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING,
      },

      birthdate: {
        type: DataTypes.DATEONLY,
      },

      login: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'clients',
      timestamps: false,
    }
  );
  Client.sync();
};
