import { getPagination } from './../utils/pagination';
import { ProductInstance, Product } from '../models';
import { db } from '../db';
import {
  TDeletedProduct,
  TProduct,
  TProducts,
  TProductReqBody,
  TProductsAndCount,
} from './product.type';
import { Op } from 'sequelize';

class ProductService {
  async createProduct(body: TProductReqBody) {
    ProductInstance(db);

    const result: TProduct = {
      ok: false,
      value: null,
    };

    await Product.create({
      id: body.id,
      name: body.name,
      price: body.price,
      count: body.count,
      description: body.description,
      picture: body.picture,
      category_id: body.category_id,
    })
      .then((value) => {
        result.value = value;
        result.ok = true;
      })
      .catch((reason) => {
        result.error = reason;

        //throw new Error(`Can't create product`);
      });

    return result;
  }

  async getProduct(id: number) {
    ProductInstance(db);

    const result: TProduct = { ok: false, value: null };

    await Product.findByPk(id)
      .then((value) => {
        result.ok = true;
        result.value = value;
      })
      .catch((reason) => {
        result.error = reason;
      });

    return result;
  }

  async getProducts(valueOfField: object, field: string, paginate: object) {
    ProductInstance(db);

    const result: TProductsAndCount = { value: null, ok: false, rowsCount: 0 };

    let products!: Promise<{
      rows: Product[];
      count: number;
    }>;

    let sort: string | undefined;

    const moreThen = Number(valueOfField['moreThen' as keyof Object])
      ? Number(valueOfField['moreThen' as keyof Object])
      : undefined;
    const lessThen = Number(valueOfField['lessThen' as keyof Object])
      ? Number(valueOfField['lessThen' as keyof Object])
      : undefined;
    const equal = Number(valueOfField['equal' as keyof Object])
      ? Number(valueOfField['equal' as keyof Object])
      : undefined;

    sort = String(valueOfField['sort' as keyof Object]);

    let { limit, offset } = getPagination(
      Number(paginate['page' as keyof Object]),
      Number(paginate['limit' as keyof Object])
    );

    if (field == 'categoryId') {
      // await Product.findAll({ where: { [field]: valueOfField } })
      products = Product.findAndCountAll({
        where: { category_id: Number(valueOfField) },
        limit: limit,
        offset: offset,
      });
    }

    if (field == 'id') {
      products = Product.findAndCountAll({
        where: { id: Number(valueOfField) },
        limit: limit,
        offset: offset,
      });
    }

    if (field == 'name') {
      products = Product.findAndCountAll({
        where: { name: valueOfField },
        limit: limit,
        offset: offset,
      });
    }

    if (field == 'price') {
      products = Product.findAndCountAll({
        where: {
          price: {
            [Op.or]: {
              [Op.eq]: equal,
              [Op.gt]: moreThen,
              [Op.lt]: lessThen,
            },
          },
        },
        limit: limit,
        offset: offset,
      });
    }

    await products
      .then((value) => {
        if (sort === '+') value.rows.sort((a, b) => a.price - b.price);
        else if (sort === '-') value.rows.sort((a, b) => b.price - a.price);

        result.value = value.rows;
        result.rowsCount = value.count;
        result.ok = true;
      })
      .catch((reason) => {
        result.error = reason;
      });

    return result;
  }

  async updateProduct(body: TProductReqBody) {
    ProductInstance(db);

    const result: TProducts = { value: null, ok: false };

    await Product.update(
      {
        id: body.id,
        name: body.name,
        price: body.price,
        count: body.count,
        description: body.description,
        picture: body.picture,
        category_id: body.category_id,
      },
      { where: { id: body.id }, returning: true }
    )
      .then((value) => {
        result.value = value[1];
        result.ok = true;
      })
      .catch((reason) => {
        result.error = reason;
      });

    return result;
  }

  async deleteProduct(id: number) {
    ProductInstance(db);

    const result: TDeletedProduct = { value: 0, ok: false };

    await Product.destroy({ where: { id: id } })
      .then((value) => {
        result.ok = true;
        result.value = value;
      })
      .catch((reason) => {
        result.error = reason;
      });

    return result;
  }
}

export default new ProductService();
