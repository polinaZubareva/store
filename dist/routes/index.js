"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const basket_route_1 = __importDefault(require("./basket.route"));
const category_route_1 = __importDefault(require("./category.route"));
const order_route_1 = __importDefault(require("./order.route"));
const product_route_1 = __importDefault(require("./product.route"));
const router = express_1.default.Router();
router.use('/user/basket', basket_route_1.default);
router.use('/category', category_route_1.default);
router.use('/user/order', order_route_1.default);
router.use('/product', product_route_1.default);
exports.default = router;
