import { orderController } from '../controllers';
import { Router } from 'express';

const orderRouter = Router();

orderRouter.get('/getOrder/:id', orderController.read);
orderRouter.get('/getOrders', orderController.readSeveral);
orderRouter.post('/postOrder', orderController.create);
orderRouter.delete('/deleteOrder/:id', orderController.delete);

export default orderRouter;
