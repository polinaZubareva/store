"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = exports.orderController = exports.categoryController = exports.basketController = void 0;
const product_controller_1 = __importDefault(require("./product.controller"));
exports.productController = product_controller_1.default;
const basket_controller_1 = __importDefault(require("./basket.controller"));
exports.basketController = basket_controller_1.default;
const category_controller_1 = __importDefault(require("./category.controller"));
exports.categoryController = category_controller_1.default;
const order_controller_1 = __importDefault(require("./order.controller"));
exports.orderController = order_controller_1.default;
