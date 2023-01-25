import { Product } from '../models';

type TProduct = {
  ok: boolean;
  error?: Error;
  value: Product | null;
};

export { type TProduct };
