import { basketController } from '../controllers';
import { Router } from 'express';

const basketRouter = Router();

basketRouter.get('/getBasket/:basketId', basketController.read);
basketRouter.post('/postBasket', basketController.createBasket);
basketRouter.post('/:basketId/postProduct', basketController.addProduct);
basketRouter.delete('/:basketId', basketController.delete);
basketRouter.put('/updateProductIn', basketController.update);

export default basketRouter;
