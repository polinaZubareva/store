import { DataTypes, Model, Sequelize } from '../db';
import Category from './category';

export default class Product extends Model {
  id!: number;
  name!: string;
  price!: number;
  count!: number;
  description?: string;
  picture!: string; //????????????
  category_id!: number;
}

export const ProductInstance = (sequelize: Sequelize) => {
  Product.init(
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
      price: {
        type: DataTypes.DECIMAL(2),
        allowNull: false,
      },
      count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      picture: {
        type: DataTypes.BLOB,
      },
    },
    {
      sequelize,
      tableName: 'products',
      timestamps: false,
    }
  );

  Category.hasMany(Product, {
    onDelete: 'CASCADE',
  });
  Product.belongsTo(Category);

  Product.sync();
};

// CREATE TABLE product (
//     id              serial PRIMARY KEY,
//     name            varchar(255),
//     price           numeric(2),
//     count           integer,
//     description     varchar(255),
//     picture         bytea,
//     category_id     integer,
//     FOREIGN KEY(category_id) REFERENCES category(id)
// );
