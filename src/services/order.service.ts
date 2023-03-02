import { orderStatus } from '../models/order';
import { db } from '../db';
import { Order, OrderInstance } from '../models';
import ProductsInOrders, {
  ProductsInOrderInstance,
} from '../models/productsInOrder';
import { TOrder, TOrders } from './order.type';

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

    await Order.create({ client_id: userId, order_status: status })
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

  async updateStatus(orderId: number, status: orderStatus) {
    OrderInstance(db);

    const updatedOrder = await Order.update(
      { order_status: status },
      { where: { id: orderId }, returning: true }
    );

    return updatedOrder[1];
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

    if (result.order !== undefined) {
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

  async getOrders(userId: number) {
    OrderInstance(db);
    ProductsInOrderInstance(db);

    const result: TOrders = {
      ok: false,
      order: null,
      details: null,
    };

    const orders = await Order.findAll({ where: { client_id: userId } });
    const ordersIds = orders.map((value) => value.id);

    if (result.order !== undefined) {
      result.order = orders;
      result.ok = true;

      await ProductsInOrders.findAll({ where: { order_id: ordersIds } })
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
