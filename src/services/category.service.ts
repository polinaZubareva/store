import { db } from '../db';
import { Category, CategoryInstance } from '../models';
import { TCategory, TDeletedCategory, TCategories } from './category.type';

class CategoryService {
  async getCategory(categoryId: number) {
    CategoryInstance(db);

    const result: TCategory = { ok: false, value: null };

    await Category.findByPk(categoryId)
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
    CategoryInstance(db);

    const result: TCategories = { ok: false, value: null };

    await Category.findAll()
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

  async createCategory(name: string, parentId?: number) {
    CategoryInstance(db);

    const result: TCategory = { ok: false, value: null };

    await Category.create({ name: name, parent_id: parentId })
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

  async deleteCategory(categoryId: number) {
    CategoryInstance(db);

    const result: TDeletedCategory = { ok: false, value: 0 };

    await Category.destroy({ where: { id: categoryId } })
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

  async updateCategory(id: number, name: string, parentId: number) {
    CategoryInstance(db);

    const result: TCategories = { ok: false, value: null };

    await Category.update(
      { name: name, parent_id: parentId },
      { where: { id: id }, returning: true }
    )
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

export default new CategoryService();
