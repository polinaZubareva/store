import { productController } from '../controllers';
import { Router } from 'express';

const productRouter = Router();

productRouter.get('/getOne/:id', productController.readOne);
productRouter.get('/getProducts', productController.readSeveral);
productRouter.post('/createProduct', productController.create);
productRouter.delete('/deleteProduct/:id', productController.delete);
productRouter.put('/updateProduct', productController.update);

export default productRouter;
