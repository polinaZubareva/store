import { basketService } from '../services';
import { Request, Response } from 'express';
import { TDeletedCount } from '../services/basket.type';

class BasketController {
  async createBasket(req: Request, res: Response) {
    const { client_id: userId } = req.body;

    const createdBasket = await basketService.createBasket(+userId);

    res.status(201).json(createdBasket);
  }

  async addProduct(req: Request, res: Response) {
    const { product_id: productId, product_count: count = 0 } = req.body;
    const basketId = +req.params.basketId;

    const createdProduct = await basketService.addProductToBasket(
      basketId,
      productId,
      count
    );
    res.status(201).json(createdProduct);
  }

  async read(req: Request, res: Response) {
    const basketId: number = +req.params.basketId;

    const productsInBasket = await basketService.getProductsInBasket(basketId);
    res.status(200).json(productsInBasket);
  }

  async delete(req: Request, res: Response) {
    const basketId: number = +req.params.basketId;
    let deletedCount: TDeletedCount;

    const { products_id: productsId = undefined } = req.body;
    if (!!productsId.length) {
      deletedCount = await basketService.deleteProductsFromBasket(
        basketId,
        productsId
      );
    } else {
      deletedCount = await basketService.clearUserBasket(+basketId);
    }
    res.status(200).json(deletedCount);
  }

  async update(req: Request, res: Response) {
    const {
      basket_id: basketId,
      product_id: productId,
      product_count: count,
    } = req.body;
    const updatedProductCount = basketService.updateProductInBasket(
      +basketId,
      +productId,
      +count
    );
    res.status(200).json(updatedProductCount);
  }
}

export default new BasketController();
