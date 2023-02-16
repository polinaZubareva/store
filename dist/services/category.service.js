"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const models_1 = require("../models");
class CategoryService {
    async getCategory(categoryId) {
        (0, models_1.CategoryInstance)(db_1.db);
        const result = { ok: false, value: null };
        await models_1.Category.findByPk(categoryId)
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
    async getCategories() {
        (0, models_1.CategoryInstance)(db_1.db);
        const result = { ok: false, value: null };
        await models_1.Category.findAll()
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
    async createCategory(name, parentId) {
        (0, models_1.CategoryInstance)(db_1.db);
        const result = { ok: false, value: null };
        await models_1.Category.create({ name: name, parent_id: parentId })
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
    async deleteCategory(categoryId) {
        (0, models_1.CategoryInstance)(db_1.db);
        const result = { ok: false, value: 0 };
        await models_1.Category.destroy({ where: { id: categoryId } })
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
    async updateCategory(id, name, parentId) {
        (0, models_1.CategoryInstance)(db_1.db);
        const result = { ok: false, value: null };
        await models_1.Category.update({ name: name, parent_id: parentId }, { where: { id: id }, returning: true })
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
}
exports.default = new CategoryService();
