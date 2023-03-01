import { Basket, ProductsInBaskets } from '../models';

type TProductsInBasket = {
  ok: boolean;
  value: ProductsInBaskets | ProductsInBaskets[] | null;
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
  type TProductsInBasket,
  type TBaskets,
  type TDeletedCount,
  type TCreateBasket,
};
