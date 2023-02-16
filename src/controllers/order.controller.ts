import { orderService } from '../services';
import { Request, Response } from 'express';

class OrderController {
  async create(req: Request, res: Response) {
    const { iser_id: userId, orderStatus, products, count } = req.body;

    const createdOrder = await orderService.createOrder(
      userId,
      orderStatus,
      products,
      count
    );

    res.status(201).json(createdOrder);
  }

  async read(req: Request, res: Response) {
    const orderId: number = +req.params.id;

    const readOrder = await orderService.getOrder(orderId);

    res.status(200).json(readOrder);
  }

  async readSeveral(req: Request, res: Response) {
    const userId: number = req.body;

    const readOrders = await orderService.getOrders(userId);

    res.status(200).json(readOrders);
  }

  async delete(req: Request, res: Response) {
    const orderId: number = +req.params.id;

    const deletedOrder = await orderService.deleteOrder(orderId);

    res.json(deletedOrder);
  }
}

export default new OrderController();
