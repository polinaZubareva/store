import { orderStatus } from '../models/order';
import { db } from '../db';
import { Order, OrderInstance } from '../models';
import ProductsInOrders, {
  ProductsInOrderInstance,
} from '../models/productsInOrder';

type TOrder = {
  ok: boolean;
  errorOrder?: Error;
  errorProducts?: Error;
  order: Order | null;
  details: ProductsInOrders | null;
};

class OrderService {
  async createOrder(
    userId: number,
    status: orderStatus,
    productsId: number[],
    productsCount: number[]
  ) {
    OrderInstance(db);
    ProductsInOrderInstance(db);

    const result: TOrder = {
      order: null,
      ok: false,
      details: null,
    };

    await Order.create({ user_id: userId, order_status: status })
      .then((value) => {
        result.ok = true;
        result.order = value;
      })
      .catch((reason) => {
        result.errorOrder = reason;
      });

    if (result.order !== null) {
      await ProductsInOrders.create({
        order_id: result.order.id,
        products_id: productsId,
        products_count: productsCount,
      })
        .then((value) => {
          result.details = value;
        })
        .catch((reason) => {
          result.errorProducts = reason;
        });
    } else result.ok = false;
    return result;
  }

  async getOrder(orderId: number) {
    OrderInstance(db);
    ProductsInOrderInstance(db);

    const result: TOrder = {
      order: null,
      ok: false,
      details: null,
    };

    await Order.findByPk(orderId)
      .then((value) => {
        result.order = value;
        result.ok = true;
      })
      .catch((reason) => {
        result.errorOrder = reason;
      });

    if (result.order !== null) {
      await ProductsInOrders.findOne({ where: { order_id: orderId } })
        .then((value) => {
          result.details = value;
        })
        .catch((reason) => {
          result.errorProducts = reason;
        });
    } else result.ok = false;

    return result;
  }

  async deleteOrder(orderId: number) {
    OrderInstance(db);
    ProductsInOrderInstance(db);

    const result: {
      deletedOrder: number;
      deletedProductsIn: number;
      error?: Error;
    } = {
      deletedOrder: 0,
      deletedProductsIn: 0,
    };

    await Order.destroy({ where: { id: orderId } })
      .then((value) => {
        result.deletedOrder = value;
      })
      .catch((reason) => {
        result.error = reason;
      });

    await ProductsInOrders.destroy({ where: { id: orderId } })
      .then((value) => {
        result.deletedProductsIn = value;
      })
      .catch((reason) => {
        result.error = reason;
      });

    return result;
  }
}

export default new OrderService();
