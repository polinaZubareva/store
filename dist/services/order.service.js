"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const models_1 = require("../models");
const productsInOrder_1 = __importStar(require("../models/productsInOrder"));
class OrderService {
    async createOrder(userId, status, productsId, productsCount) {
        (0, models_1.OrderInstance)(db_1.db);
        (0, productsInOrder_1.ProductsInOrderInstance)(db_1.db);
        const result = {
            order: null,
            ok: false,
            details: null,
        };
        await models_1.Order.create({ user_id: userId, order_status: status })
            .then((value) => {
            result.ok = true;
            result.order = value;
        })
            .catch((reason) => {
            result.errorOrder = reason;
        });
        if (result.order !== null) {
            await productsInOrder_1.default.create({
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
        }
        else
            result.ok = false;
        return result;
    }
    async getOrder(orderId) {
        (0, models_1.OrderInstance)(db_1.db);
        (0, productsInOrder_1.ProductsInOrderInstance)(db_1.db);
        const result = {
            order: null,
            ok: false,
            details: null,
        };
        await models_1.Order.findByPk(orderId)
            .then((value) => {
            result.order = value;
            result.ok = true;
        })
            .catch((reason) => {
            result.errorOrder = reason;
        });
        if (result.order !== null) {
            await productsInOrder_1.default.findOne({ where: { order_id: orderId } })
                .then((value) => {
                result.details = value;
            })
                .catch((reason) => {
                result.errorProducts = reason;
            });
        }
        else
            result.ok = false;
        return result;
    }
    async deleteOrder(orderId) {
        (0, models_1.OrderInstance)(db_1.db);
        (0, productsInOrder_1.ProductsInOrderInstance)(db_1.db);
        const result = {
            deletedOrder: 0,
            deletedProductsIn: 0,
        };
        await models_1.Order.destroy({ where: { id: orderId } })
            .then((value) => {
            result.deletedOrder = value;
        })
            .catch((reason) => {
            result.error = reason;
        });
        await productsInOrder_1.default.destroy({ where: { id: orderId } })
            .then((value) => {
            result.deletedProductsIn = value;
        })
            .catch((reason) => {
            result.error = reason;
        });
        return result;
    }
}
exports.default = new OrderService();
