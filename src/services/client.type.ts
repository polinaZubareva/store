import { Client } from '../models';

type TClientReqBody = {
  id: number;
  name?: string;
  birthdate?: Date;
  login: string;
  password: string;
};

type TClient = {
  ok: boolean;
  value: Client | null;
  error?: Error;
};

type TDeletedClient = {
  ok: boolean;
  value: number;
  error?: Error;
};

type TUpdateClient = {
  ok: boolean;
  value: Client | null;
  error?: Error;
};

export {
  type TClient,
  type TClientReqBody,
  type TDeletedClient,
  type TUpdateClient,
};
