"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
class CategoryController {
    async create(req, res) {
        const { name, parent_id: parentId } = req.body;
        const createdCategory = await services_1.categoryService.createCategory(name, parentId);
        res.status(201).json(createdCategory);
    }
    async read(req, res) {
        const categoryId = +req.params.id;
        const readCategory = await services_1.categoryService.getCategory(categoryId);
        res.status(200).json(readCategory);
    }
    async readAll(req, res) {
        const readCategories = await services_1.categoryService.getCategories();
        res.status(200).json(readCategories);
    }
    async update(req, res) {
        const { id, name, parent_id: parentId = null } = req.body;
        const updatedCategory = await services_1.categoryService.updateCategory(id, name, parentId);
        res.status(200).json(updatedCategory);
    }
    async delete(req, res) {
        const categoryId = +req.params.id;
        const deletedCategory = await services_1.categoryService.deleteCategory(categoryId);
        res.status(200).json(deletedCategory);
    }
}
exports.default = new CategoryController();
