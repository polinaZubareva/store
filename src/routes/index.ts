import express from 'express';
import basketRouter from './basket.route';
import categoryRouter from './category.route';
import orderRouter from './order.route';
import productRouter from './product.route';
import clientRouter from './client.route';

const router = express.Router();

router.use('/user/basket', basketRouter);
router.use('/category', categoryRouter);
router.use('/user/order', orderRouter);
router.use('/product', productRouter);
router.use('/client', clientRouter);

export default router;
