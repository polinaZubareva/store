import { categoryController } from '../controllers';
import { Router } from 'express';

const categoryRouter = Router();

categoryRouter.get('/getCategory/:id', categoryController.read);
categoryRouter.get('/getCategories', categoryController.readAll);
categoryRouter.post('/createCategory', categoryController.create);
categoryRouter.delete('/deleteCategory/:id', categoryController.delete);
categoryRouter.put('/updateCategory', categoryController.update);

export default categoryRouter;
