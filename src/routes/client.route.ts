import auth from '../utils/client.auth';
import { clientController } from '../controllers';
import { Router } from 'express';

const clientRouter = Router();

clientRouter.get('/getClient/:id', auth, clientController.read);
clientRouter.get('/login', clientController.login);
clientRouter.post('/createClient', clientController.create);
clientRouter.delete('/deleteClient', auth, clientController.delete);
clientRouter.put('/updateClient', auth, clientController.update);

export default clientRouter;
