"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const models_1 = require("../models");
class BasketService {
    async createBasket(userId) {
        (0, models_1.BasketInstance)(db_1.db);
        const result = {
            ok: false,
            value: null,
            error: undefined,
        };
        await models_1.Basket.create({
            user_id: userId,
        })
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
    async clearUserBasket(basketId) {
        (0, models_1.BasketInstance)(db_1.db);
        (0, models_1.ProductsInBasketInstance)(db_1.db);
        const result = {
            ok: false,
            deletedCount: 0,
            error: undefined,
        };
        await models_1.ProductsInBaskets.destroy({ where: { basket_id: basketId } })
            .then((value) => {
            if (value == 0)
                result.error = new Error('Nothing to delete');
            else {
                result.ok = true;
                result.deletedCount = value;
            }
        })
            .catch((reason) => {
            console.log(reason);
            result.error = reason;
        });
        return result;
    }
    async deleteProductsFromBasket(basketId, productsId) {
        (0, models_1.BasketInstance)(db_1.db);
        (0, models_1.ProductsInBasketInstance)(db_1.db);
        const result = {
            ok: false,
            deletedCount: 0,
            error: undefined,
        };
        await models_1.ProductsInBaskets.destroy({
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
    async updateProductInBasket(basketId, productId, count) {
        (0, models_1.ProductsInBasketInstance)(db_1.db);
        const result = {
            ok: false,
            value: null,
            error: undefined,
        };
        await models_1.ProductsInBaskets.update({ product_count: count }, { where: { basket_id: basketId, product_id: productId }, returning: true })
            .then((value) => {
            result.value = value[1];
            result.ok = true;
        })
            .catch((reason) => {
            console.log(reason);
            result.error = reason;
        });
        return result;
    }
    async getProductsInBasket(basketId) {
        (0, models_1.ProductsInBasketInstance)(db_1.db);
        const result = {
            ok: false,
            value: null,
            error: undefined,
        };
        await models_1.ProductsInBaskets.findAll({ where: { basket_id: basketId } })
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
    async addProductToBasket(basketId, productId, count) {
        (0, models_1.ProductsInBasketInstance)(db_1.db);
        const result = {
            ok: false,
            value: null,
        };
        await models_1.ProductsInBaskets.create({
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
        return result;
    }
}
exports.default = new BasketService();
