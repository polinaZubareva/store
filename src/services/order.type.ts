import { Order } from 'models';
import ProductsInOrders from 'models/productsInOrder';

type TOrder = {
  ok: boolean;
  errorOrder?: Error;
  errorProducts?: Error;
  order: Order | null;
  details: ProductsInOrders | null;
};

type TOrders = {
  ok: boolean;
  errorOrder?: Error;
  errorProducts?: Error;
  order: Order[] | null;
  details: ProductsInOrders[] | null;
};

export { type TOrder, type TOrders };
