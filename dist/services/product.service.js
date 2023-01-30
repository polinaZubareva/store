"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const db_1 = require("../db");
class ProductService {
    async createProduct(body) {
        (0, models_1.ProductInstance)(db_1.db);
        const { id, name = '', price = 0, count = 0, description, picture = '', category_id, } = body;
        const result = {
            ok: false,
            value: null,
        };
        await models_1.Product.create({
            id: id,
            name: name,
            price: price,
            count: count,
            description: description,
            picture: picture,
            category_id: category_id,
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
    async getProduct(id) {
        (0, models_1.ProductInstance)(db_1.db);
        const result = { ok: false, value: null };
        await models_1.Product.findByPk(id)
            .then((value) => {
            result.ok = true;
            result.value = value;
        })
            .catch((reason) => {
            result.error = reason;
        });
        return result;
    }
    async getProducts(valueOfField, field) {
        (0, models_1.ProductInstance)(db_1.db);
        const result = { value: null, ok: false };
        if (field == 'categoryId')
            // await Product.findAll({ where: { [field]: valueOfField } })
            await models_1.Product.findAll({ where: { category_id: valueOfField } })
                .then((value) => {
                result.value = value;
                result.ok = true;
            })
                .catch((reason) => {
                result.error = reason;
            });
        if (field == 'id')
            await models_1.Product.findAll({ where: { id: valueOfField } })
                .then((value) => {
                result.value = value;
                result.ok = true;
            })
                .catch((reason) => {
                result.error = reason;
            });
        return result;
    }
    async updateProduct(body) {
        (0, models_1.ProductInstance)(db_1.db);
        const result = { value: null, ok: false };
        await models_1.Product.update({
            id: body.id,
            name: body.name,
            price: body.price,
            count: body.count,
            description: body.description,
            picture: body.picture,
            category_id: body.category_id,
        }, { where: { id: body.id }, returning: true })
            .then((value) => {
            result.value = value[1];
            result.ok = true;
        })
            .catch((reason) => {
            result.error = reason;
        });
        return result;
    }
    async deleteProduct(id) {
        (0, models_1.ProductInstance)(db_1.db);
        const result = { value: 0, ok: false };
        await models_1.Product.destroy({ where: { id: id } })
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
exports.default = new ProductService();
