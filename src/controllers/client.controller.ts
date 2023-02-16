import { TClientReqBody } from '../services/client.type';
import { Request, Response } from 'express';
import { clientService } from '../services';
import { config } from 'dotenv';
import { createToken } from '../utils/client.util';
config();

class ClientController {
  async create(req: Request<any, any, TClientReqBody>, res: Response) {
    const data = req.body;

    const createdClient = await clientService.create(data);

    const token = await createToken(createdClient.value);

    res.status(201).json({ client: createdClient, jwtToken: token });
  }

  async delete(req: Request, res: Response) {
    const { login } = req.body;

    const deletedCount = await clientService.delete(String(login));

    res.status(200).json(deletedCount);
  }

  async update(req: Request<any, any, TClientReqBody>, res: Response) {
    const data = req.body;

    const updated = await clientService.update(data);

    res.status(201).json(updated);
  }

  async read(req: Request, res: Response) {
    const id: number = +req.params.id;

    const readOne = await clientService.read(id);

    res.status(200).json(readOne);
  }

  async login(req: Request<any, any, TClientReqBody>, res: Response) {
    const { login, password } = req.body;

    const loginClient = await clientService.signin(login, password);

    const token = await createToken(loginClient.value);

    res.status(200).json({ client: loginClient, jwtToken: token });
  }
}

export default new ClientController();
