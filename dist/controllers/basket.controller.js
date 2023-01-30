"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
class BasketController {
    async createBasket(req, res) {
        const { userId } = req.body;
        const createdBasket = await services_1.basketService.createBasket(+userId);
        res.status(201).json(createdBasket);
    }
    async addProduct(req, res) {
        const { productId = undefined, count = 0 } = req.body;
        const basketId = +req.params.basketId;
        const createdProduct = await services_1.basketService.addProductToBasket(basketId, productId, count);
        res.status(201).json(createdProduct);
    }
    async read(req, res) {
        const basketId = +req.params.basketId;
        const productsInBasket = await services_1.basketService.getProductsInBasket(basketId);
        res.status(200).json(productsInBasket);
    }
    async delete(req, res) {
        const basketId = +req.params.basketId;
        let deletedCount;
        const { productsId = undefined } = req.body;
        if (!!productsId.length) {
            deletedCount = await services_1.basketService.deleteProductsFromBasket(basketId, 
            // Array.from(productsId)
            productsId);
        }
        else {
            deletedCount = await services_1.basketService.clearUserBasket(+basketId);
        }
        res.status(200).json(deletedCount);
    }
    async update(req, res) {
        const { basketId, productId, count } = req.body;
        const updatedProductCount = services_1.basketService.updateProductInBasket(+basketId, +productId, +count);
        res.status(200).json(updatedProductCount);
    }
}
exports.default = new BasketController();
