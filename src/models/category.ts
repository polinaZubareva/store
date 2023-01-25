import { Model, DataTypes, Sequelize } from '../db';

export default class Category extends Model {
  id!: number;
  name!: string;
  parent_id?: number | null;
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
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    foreignKey: {
      name: 'parent_id',
    },
  });
  Category.belongsTo(Category);

  Category.sync();
};

// CREATE TABLE category (
//     id          serial PRIMARY KEY,
//     name        varchar(255),
//     parent_id   integer,
//     FOREIGN KEY(parent_id) REFERENCES category(id)

// );
