"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
class ProductController {
    async create(req, res) {
        const data = req.body;
        const created = await services_1.productService.createProduct(data);
        res.status(201).json(created);
    }
    async delete(req, res) {
        const id = +req.params.id;
        const deletedCount = await services_1.productService.deleteProduct(id);
        res.status(200).json(deletedCount);
    }
    async update(req, res) {
        const data = req.body;
        const updated = await services_1.productService.updateProduct(data);
        res.status(201).json(updated);
    }
    async readOne(req, res) {
        const id = +req.params.id;
        const readOne = await services_1.productService.getProduct(id);
        res.status(200).json(readOne);
    }
    async readSeveral(req, res) {
        const categoryId = +req.body.categoryId;
        const read = await services_1.productService.getProduct(categoryId);
        res.status(200).json(read);
    }
}
exports.default = new ProductController();
