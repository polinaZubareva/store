import { db } from '../db';
import {
  Basket,
  BasketInstance,
  ProductsInBasketInstance,
  ProductsInBaskets,
} from '../models';
import { TCreateBasket, TDeletedCount, TProductsInBasket } from './basket.type';

class BasketService {
  async createBasket(userId: number): Promise<object> {
    BasketInstance(db);

    const result: TCreateBasket = {
      ok: false,
      value: null,
      error: undefined,
    };

    const idList = await Basket.findOne({ where: { client_id: userId } });
    if (!idList)
      await Basket.create({
        client_id: userId,
      })
        .then((value: Basket) => {
          result.value = value;
          result.ok = true;
        })
        .catch((reason: Error) => {
          console.log(reason);

          result.error = reason;
        });

    return result;
  }

  async clearUserBasket(basketId: number) {
    BasketInstance(db);
    ProductsInBasketInstance(db);

    const result: TDeletedCount = {
      ok: false,
      deletedCount: 0,
      error: undefined,
    };

    await ProductsInBaskets.destroy({ where: { basket_id: basketId } })
      .then((value) => {
        if (value == 0) result.error = new Error('Nothing to delete');
        else {
          result.ok = true;
          result.deletedCount = value;
        }
      })
      .catch((reason: Error) => {
        console.log(reason);

        result.error = reason;
      });

    return result;
  }

  async deleteProductsFromBasket(basketId: number, productsId: number[]) {
    BasketInstance(db);
    ProductsInBasketInstance(db);

    const result: TDeletedCount = {
      ok: false,
      deletedCount: 0,
      error: undefined,
    };

    await ProductsInBaskets.destroy({
      where: { basket_id: basketId, product_id: productsId },
    })
      .then((value) => {
        result.deletedCount = value;
        result.ok = true;
      })
      .catch((reason) => {
        console.log(reason);

        result.error = reason;
      });

    return result;
  }

  async updateProductInBasket(
    basketId: number,
    productId: number,
    count: number
  ) {
    ProductsInBasketInstance(db);

    const result: TProductsInBasket = {
      ok: false,
      value: null,
      error: undefined,
    };

    await ProductsInBaskets.update(
      { product_count: count },
      { where: { basket_id: basketId, product_id: productId }, returning: true }
    )
      .then((value) => {
        result.value = value[1];
        result.ok = true;
      })
      .catch((reason: Error) => {
        console.log(reason);

        result.error = reason;
      });

    return result;
  }

  async getProductsInBasket(basketId: number) {
    ProductsInBasketInstance(db);

    const result: TProductsInBasket = {
      ok: false,
      value: null,
      error: undefined,
    };

    await ProductsInBaskets.findAll({ where: { basket_id: basketId } })
      .then((value) => {
        result.value = value;
        result.ok = true;
      })
      .catch((reason) => {
        console.log(reason);

        result.error = reason;
      });
    return result;
  }

  async addProductToBasket(basketId: number, productId: number, count: number) {
    ProductsInBasketInstance(db);

    const result: TProductsInBasket = {
      ok: false,
      value: null,
    };

    const ifExistInBasket = await ProductsInBaskets.findOne({
      where: { basket_id: basketId, product_id: productId },
    });
    console.log(ifExistInBasket);

    if (!ifExistInBasket)
      await ProductsInBaskets.create({
        basket_id: basketId,
        product_id: productId,
        product_count: count,
      })
        .then((value) => {
          result.value = value;
          result.ok = true;
        })
        .catch((reason) => {
          console.log(reason);

          result.error = reason;
        });
    else {
      const addOne = await this.updateProductInBasket(
        basketId,
        productId,
        ifExistInBasket.product_count + 1
      );
      result.value = addOne.value;
      result.ok = addOne.ok;
      result.error = addOne.error;
    }

    return result;
  }
}

export default new BasketService();
