import { TProductReqBody } from '../services/product.type';
import { productService } from '../services';
import { Request, Response } from 'express';

class ProductController {
  async create(req: Request<any, any, TProductReqBody>, res: Response) {
    const data = req.body;

    const created = await productService.createProduct(data);

    res.status(201).json(created);
  }

  async delete(req: Request, res: Response) {
    const id: number = +req.params.id;

    const deletedCount = await productService.deleteProduct(id);

    res.status(200).json(deletedCount);
  }

  async update(req: Request<any, any, TProductReqBody>, res: Response) {
    const data = req.body;

    const updated = await productService.updateProduct(data);

    res.status(201).json(updated);
  }

  async readOne(req: Request, res: Response) {
    const id: number = +req.params.id;

    const readOne = await productService.getProduct(id);

    res.status(200).json(readOne);
  }

  async readSeveral(req: Request, res: Response) {
    const { field, value, paginate } = req.body;

    const read = await productService.getProducts(value, field, paginate);

    res.status(200).json(read);
  }
}

export default new ProductController();
