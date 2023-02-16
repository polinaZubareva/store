import { Model, Sequelize, DataTypes } from 'sequelize';

export default class Category extends Model {
  id!: number;
  name!: string;
  parent_id?: number;
}

export const CategoryInstance = (sequelize: Sequelize) => {
  Category.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      parent_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      tableName: 'categories',
      timestamps: false,
    }
  );

  Category.hasOne(Category, {
    foreignKey: {
      name: 'parent_id',
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  });
  Category.belongsTo(Category, {
    foreignKey: {
      name: 'parent_id',
    },
  });

  Category.sync();
};
