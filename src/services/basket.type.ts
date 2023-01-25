import { Basket, ProductsInBaskets } from '../models';

type TProductsInBaskets = {
  ok: boolean;
  value: ProductsInBaskets[] | null;
  error?: Error;
};

type TProductInBasket = {
  ok: boolean;
  value: ProductsInBaskets | null;
  error?: Error;
};

type TBaskets = {
  ok: boolean;
  value: Basket[] | null;
  error?: Error;
};

type TCreateBasket = {
  ok: boolean;
  value: Basket | null;
  error?: Error;
};

type TDeletedCount = {
  ok: boolean;
  deletedCount: number;
  error?: Error;
};

export {
  type TProductsInBaskets,
  type TBaskets,
  type TDeletedCount,
  type TCreateBasket,
  type TProductInBasket,
};
