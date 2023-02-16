import { ProductInstance, Product } from '../models';
import { db } from '../db';
import {
  TDeletedProduct,
  TProduct,
  TProducts,
  TProductReqBody,
} from './product.type';

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

  async getProducts(valueOfField: number, field: string) {
    ProductInstance(db);

    const result: TProducts = { value: null, ok: false };

    if (field == 'categoryId')
      // await Product.findAll({ where: { [field]: valueOfField } })
      await Product.findAll({ where: { category_id: valueOfField } })
        .then((value) => {
          result.value = value;
          result.ok = true;
        })
        .catch((reason) => {
          result.error = reason;
        });

    if (field == 'id')
      await Product.findAll({ where: { id: valueOfField } })
        .then((value) => {
          result.value = value;
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
