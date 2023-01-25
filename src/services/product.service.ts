import { ProductInstance, Product } from '../models';
import { db } from '../db';
import { TProduct } from './product.type';

class ProductService {
  async createProduct() {
    ProductInstance(db);

    const result: TProduct = {
      ok: false,
      value: null,
    };

    await Product.create({});
  }
}

export default new ProductService();
