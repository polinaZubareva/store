"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
class CategoryController {
    async create(req, res) {
        const { name, parentId = null } = req.body;
        const createdCategory = await services_1.categoryService.createCategory(name, parentId);
        res.status(201).json(createdCategory);
    }
    async read(req, res) {
        const categoryId = +req.params.id;
        const createdCategory = await services_1.categoryService.getCategory(categoryId);
        res.status(200).json(createdCategory);
    }
    async update(req, res) {
        const { id, name, parentId = null } = req.body;
        const createdCategory = await services_1.categoryService.updateCategory(id, name, parentId);
        res.status(200).json(createdCategory);
    }
    async delete(req, res) {
        const categoryId = +req.params.id;
        const createdCategory = await services_1.categoryService.deleteCategory(categoryId);
        res.status(200).json(createdCategory);
    }
}
exports.default = new CategoryController();
