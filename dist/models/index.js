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
exports.ProductsInBasketInstance = exports.ProductsInBaskets = exports.ProductInstance = exports.Product = exports.OrderInstance = exports.Order = exports.CategoryInstance = exports.Category = exports.BasketInstance = exports.Basket = exports.ClientInstance = exports.Client = void 0;
const client_1 = __importStar(require("./client"));
exports.Client = client_1.default;
Object.defineProperty(exports, "ClientInstance", { enumerable: true, get: function () { return client_1.ClientInstance; } });
const basket_1 = __importStar(require("./basket"));
exports.Basket = basket_1.default;
Object.defineProperty(exports, "BasketInstance", { enumerable: true, get: function () { return basket_1.BasketInstance; } });
const category_1 = __importStar(require("./category"));
exports.Category = category_1.default;
Object.defineProperty(exports, "CategoryInstance", { enumerable: true, get: function () { return category_1.CategoryInstance; } });
const order_1 = __importStar(require("./order"));
exports.Order = order_1.default;
Object.defineProperty(exports, "OrderInstance", { enumerable: true, get: function () { return order_1.OrderInstance; } });
const product_1 = __importStar(require("./product"));
exports.Product = product_1.default;
Object.defineProperty(exports, "ProductInstance", { enumerable: true, get: function () { return product_1.ProductInstance; } });
const productsInBasket_1 = __importStar(require("./productsInBasket"));
exports.ProductsInBaskets = productsInBasket_1.default;
Object.defineProperty(exports, "ProductsInBasketInstance", { enumerable: true, get: function () { return productsInBasket_1.ProductsInBasketInstance; } });
