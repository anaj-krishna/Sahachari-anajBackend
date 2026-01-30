"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const role_enum_1 = require("../../common/enums/role.enum");
const products_service_1 = require("../../products/products.service");
const cart_service_1 = require("../../cart/cart.service");
const orders_service_1 = require("../../orders/orders.service");
const add_to_cart_dto_1 = require("../../cart/dto/add-to-cart.dto");
const place_order_dto_1 = require("../../orders/dto/place-order.dto");
let CustomerController = class CustomerController {
    productsService;
    cartService;
    ordersService;
    constructor(productsService, cartService, ordersService) {
        this.productsService = productsService;
        this.cartService = cartService;
        this.ordersService = ordersService;
    }
    getProducts(search, category) {
        return this.productsService.findAll({ search, category });
    }
    getProduct(id) {
        return this.productsService.findById(id);
    }
    getStores() {
        return this.productsService.getStores();
    }
    getStoreProducts(storeId) {
        return this.productsService.getProductsByStore(storeId);
    }
    getCart(req) {
        return this.cartService.getCart(req.user.userId);
    }
    addToCart(req, dto) {
        return this.cartService.addToCart(req.user.userId, dto);
    }
    removeCartItem(req, itemId) {
        return this.cartService.removeItem(req.user.userId, itemId);
    }
    placeOrder(req, dto) {
        return this.ordersService.placeOrder(req.user.userId, dto);
    }
    getOrders(req) {
        return this.ordersService.getOrders(req.user.userId);
    }
    getOrder(req, orderId) {
        return this.ordersService.getOrderById(req.user.userId, orderId);
    }
    cancelOrder(req, orderId) {
        return this.ordersService.cancelOrder(req.user.userId, orderId);
    }
};
exports.CustomerController = CustomerController;
__decorate([
    (0, common_1.Get)('products'),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "getProducts", null);
__decorate([
    (0, common_1.Get)('products/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "getProduct", null);
__decorate([
    (0, common_1.Get)('stores'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "getStores", null);
__decorate([
    (0, common_1.Get)('stores/:id/products'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "getStoreProducts", null);
__decorate([
    (0, common_1.Get)('cart'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "getCart", null);
__decorate([
    (0, common_1.Post)('cart'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_to_cart_dto_1.AddToCartDto]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "addToCart", null);
__decorate([
    (0, common_1.Delete)('cart/:itemId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('itemId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "removeCartItem", null);
__decorate([
    (0, common_1.Post)('orders'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, place_order_dto_1.PlaceOrderDto]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "placeOrder", null);
__decorate([
    (0, common_1.Get)('orders'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "getOrders", null);
__decorate([
    (0, common_1.Get)('orders/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "getOrder", null);
__decorate([
    (0, common_1.Post)('orders/:id/cancel'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CustomerController.prototype, "cancelOrder", null);
exports.CustomerController = CustomerController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.USER),
    (0, common_1.Controller)('customer'),
    __metadata("design:paramtypes", [products_service_1.ProductsService,
        cart_service_1.CartService,
        orders_service_1.OrdersService])
], CustomerController);
//# sourceMappingURL=customer.controller.js.map