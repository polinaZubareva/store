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

type TProductsAndCount = {
  ok: boolean;
  error?: Error;
  value: Product[] | null;
  rowsCount: number;
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
  type TProductsAndCount,
};
