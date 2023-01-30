"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../controllers");
const express_1 = require("express");
const orderRouter = (0, express_1.Router)();
orderRouter.get('/getOrder/:id', controllers_1.orderController.read);
orderRouter.post('/postOrder', controllers_1.orderController.create);
orderRouter.delete('/deleteOrder/:id', controllers_1.orderController.delete);
exports.default = orderRouter;
