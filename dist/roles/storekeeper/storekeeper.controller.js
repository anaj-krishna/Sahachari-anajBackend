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
exports.StorekeeperController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const role_enum_1 = require("../../common/enums/role.enum");
const products_service_1 = require("../../products/products.service");
const orders_service_1 = require("../../orders/orders.service");
const create_product_dto_1 = require("../../products/dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const update_stock_dto_1 = require("./dto/update-stock.dto");
let StorekeeperController = class StorekeeperController {
    productsService;
    ordersService;
    constructor(productsService, ordersService) {
        this.productsService = productsService;
        this.ordersService = ordersService;
    }
    createProduct(req, dto) {
        return this.productsService.create(req.user.userId, dto);
    }
    getStoreProducts(req) {
        return this.productsService.getProductsByStore(req.user.userId);
    }
    getStoreProduct(req, productId) {
        return this.productsService.getStoreProductById(req.user.userId, productId);
    }
    updateProduct(req, productId, dto) {
        return this.productsService.updateProduct(req.user.userId, productId, dto);
    }
    deleteProduct(req, productId) {
        return this.productsService.deleteProduct(req.user.userId, productId);
    }
    updateStock(req, productId, dto) {
        return this.productsService.updateStock(req.user.userId, productId, dto.quantity);
    }
    getStoreOrders(req, status) {
        return this.ordersService.getOrdersByStore(req.user.userId, status);
    }
    getStoreOrder(req, orderId) {
        return this.ordersService.getStoreOrderById(req.user.userId, orderId);
    }
    acceptOrder(req, orderId) {
        return this.ordersService.acceptOrder(req.user.userId, orderId);
    }
    rejectOrder(req, orderId) {
        return this.ordersService.rejectOrder(req.user.userId, orderId);
    }
    markOrderReady(req, orderId) {
        return this.ordersService.markOrderReady(req.user.userId, orderId);
    }
    getAvailableDeliveryBoys(req, orderId) {
        return this.ordersService.getAvailableDeliveryBoys(req.user.userId, orderId);
    }
};
exports.StorekeeperController = StorekeeperController;
__decorate([
    (0, common_1.Post)('products'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", void 0)
], StorekeeperController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Get)('products'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StorekeeperController.prototype, "getStoreProducts", null);
__decorate([
    (0, common_1.Get)('products/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], StorekeeperController.prototype, "getStoreProduct", null);
__decorate([
    (0, common_1.Put)('products/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", void 0)
], StorekeeperController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Delete)('products/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], StorekeeperController.prototype, "deleteProduct", null);
__decorate([
    (0, common_1.Patch)('products/:id/stock'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_stock_dto_1.UpdateStockDto]),
    __metadata("design:returntype", void 0)
], StorekeeperController.prototype, "updateStock", null);
__decorate([
    (0, common_1.Get)('orders'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], StorekeeperController.prototype, "getStoreOrders", null);
__decorate([
    (0, common_1.Get)('orders/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], StorekeeperController.prototype, "getStoreOrder", null);
__decorate([
    (0, common_1.Post)('orders/:id/accept'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], StorekeeperController.prototype, "acceptOrder", null);
__decorate([
    (0, common_1.Post)('orders/:id/reject'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], StorekeeperController.prototype, "rejectOrder", null);
__decorate([
    (0, common_1.Post)('orders/:id/ready'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], StorekeeperController.prototype, "markOrderReady", null);
__decorate([
    (0, common_1.Get)('orders/:id/available-delivery'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], StorekeeperController.prototype, "getAvailableDeliveryBoys", null);
exports.StorekeeperController = StorekeeperController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, common_1.Controller)('storekeeper'),
    __metadata("design:paramtypes", [products_service_1.ProductsService,
        orders_service_1.OrdersService])
], StorekeeperController);
//# sourceMappingURL=storekeeper.controller.js.map