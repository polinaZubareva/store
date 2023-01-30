import { categoryService } from '../services';
import { Request, Response } from 'express';

class CategoryController {
  async create(req: Request, res: Response) {
    const { name, parentId = null } = req.body;

    const createdCategory = await categoryService.createCategory(
      name,
      parentId
    );

    res.status(201).json(createdCategory);
  }

  async read(req: Request, res: Response) {
    const categoryId: number = +req.params.id;

    const readCategory = await categoryService.getCategory(categoryId);

    res.status(200).json(readCategory);
  }

  async readAll(req: Request, res: Response) {
    const readCategories = await categoryService.getCategories();

    res.status(200).json(readCategories);
  }

  async update(req: Request, res: Response) {
    const { id, name, parentId = null } = req.body;

    const updatedCategory = await categoryService.updateCategory(
      id,
      name,
      parentId
    );

    res.status(200).json(updatedCategory);
  }

  async delete(req: Request, res: Response) {
    const categoryId: number = +req.params.id;

    const deletedCategory = await categoryService.deleteCategory(categoryId);

    res.status(200).json(deletedCategory);
  }
}

export default new CategoryController();
