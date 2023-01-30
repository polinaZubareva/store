"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
class OrderController {
    async create(req, res) {
        const { userId, orderStatus, products, count } = req.body;
        const createdOrder = await services_1.orderService.createOrder(userId, orderStatus, products, count);
        res.status(201).json(createdOrder);
    }
    async read(req, res) {
        const orderId = +req.params.id;
        const readOrder = await services_1.orderService.getOrder(orderId);
        res.status(200).json(readOrder);
    }
    async delete(req, res) {
        const orderId = +req.params.id;
        const deletedOrder = await services_1.orderService.deleteOrder(orderId);
        res.json(deletedOrder);
    }
}
exports.default = new OrderController();
