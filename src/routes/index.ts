import express from 'express';
import basketRouter from './basket.route';
import categoryRouter from './category.route';
import orderRouter from './order.route';

const router = express.Router();

router.use('/user/basket', basketRouter);
router.use('/category', categoryRouter);
router.use('/user/order', orderRouter);

export default router;
