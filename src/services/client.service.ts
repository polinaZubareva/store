import Client, { ClientInstance } from './../models/client';
import { db } from '../db';
import {
  TClient,
  TClientReqBody,
  TDeletedClient,
  TUpdateClient,
} from './client.type';
import { comparePasswords, hashPassword } from '../utils/client.util';

class ClientService {
  async signin(login: string, password: string) {
    ClientInstance(db);

    const result: TClient = {
      ok: false,
      value: null,
    };

    result.value = await Client.findOne({
      where: { login: login },
    });

    if (!!result.value?.password)
      if (await comparePasswords(password, result.value!.password)) {
        result.ok = true;
      } else {
        result.error = new Error('Password incorrect!');
      }

    return result;
  }

  async create(body: TClientReqBody) {
    ClientInstance(db);

    const result: TClient = {
      ok: false,
      value: null,
    };

    if (!body.login || !body.password) {
      result.error = new Error('Data is not full');
      return result;
    }

    await hashPassword(body.password)
      .then((value) => {
        body.password = value;
      })
      .catch((reason) => {
        result.error = reason;
      });

    await Client.create({
      name: body.name,
      birthdate: body.birthdate,
      login: body.login,
      password: body.password,
    })
      .then((value) => {
        result.ok = true;
        result.value = value;
      })
      .catch((reason) => {
        result.error = reason;
        console.log(reason);
      });

    return result;
  }

  async delete(login: string) {
    ClientInstance(db);

    const result: TDeletedClient = {
      ok: false,
      value: 0,
    };

    const clientToDelete = await Client.findOne({ where: { login: login } });

    if (clientToDelete !== null) {
      await clientToDelete
        .destroy()
        .then(() => {
          result.ok = true;
          result.value = 1;
        })
        .catch((reason) => {
          result.error = reason;
        });
    }
    return result;
  }

  async update(body: TClientReqBody) {
    ClientInstance(db);

    const result: TUpdateClient = {
      ok: false,
      value: null,
    };

    const clientToUpdate = await Client.findByPk(body.id);

    if (clientToUpdate) {
      if (!comparePasswords(body.password, clientToUpdate.password))
        await hashPassword(body.password)
          .then((value) => {
            body.password = value;
          })
          .catch((reason) => {
            result.error = reason;
          });
    }

    await clientToUpdate!
      .update({
        name: body.name,
        birthdate: body.birthdate,
        login: body.login,
        password: body.password,
      })
      .then((value) => {
        result.ok = true;
        result.value = value;
      })
      .catch((reason) => {
        result.error = reason;
        console.log(reason);
      });

    return result;
  }

  async read(id: number) {
    ClientInstance(db);

    const result: TClient = {
      ok: false,
      value: null,
    };

    await Client.findByPk(id)
      .then((value) => {
        result.ok = true;
        result.value = value;
      })
      .catch((reason) => {
        result.error = reason;

        console.log(reason);
      });

    return result;
  }
}

export default new ClientService();
