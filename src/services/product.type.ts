import { Product } from '../models';

type TProductReqBody = {
  id: number;
  name: string;
  price: number;
  count: number;
  description?: string;
  picture: Blob;
  category_id: number;
};

type TProduct = {
  ok: boolean;
  error?: Error;
  value: Product | null;
};

type TProducts = {
  ok: boolean;
  error?: Error;
  value: Product[] | null;
};

type TDeletedProduct = {
  ok: boolean;
  error?: Error;
  value: number;
};

export {
  type TProduct,
  type TProducts,
  type TDeletedProduct,
  type TProductReqBody,
};
