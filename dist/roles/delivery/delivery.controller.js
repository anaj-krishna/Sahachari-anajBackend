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
exports.DeliveryController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const role_enum_1 = require("../../common/enums/role.enum");
const orders_service_1 = require("../../orders/orders.service");
let DeliveryController = class DeliveryController {
    ordersService;
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    async getOrders(req, status, mine) {
        if (mine === 'true') {
            return this.ordersService.getMyJobs(req.user.userId);
        }
        if (status === 'READY') {
            return this.ordersService.getAvailableJobs();
        }
        return [];
    }
    async myJobs(req) {
        return this.ordersService.getMyJobs(req.user.userId);
    }
    async getOrder(orderId, req) {
        return this.ordersService.getDeliveryOrderById(req.user.userId, orderId);
    }
    async accept(orderId, req) {
        return this.ordersService.acceptJob(req.user.userId, orderId);
    }
    async pickup(orderId, req) {
        return this.ordersService.pickupOrder(req.user.userId, orderId);
    }
    async deliver(orderId, req) {
        return this.ordersService.deliverOrder(req.user.userId, orderId);
    }
    async fail(orderId, req) {
        return this.ordersService.failDelivery(req.user.userId, orderId);
    }
};
exports.DeliveryController = DeliveryController;
__decorate([
    (0, common_1.Get)('orders'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, common_1.Query)('mine')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "getOrders", null);
__decorate([
    (0, common_1.Get)('orders/me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "myJobs", null);
__decorate([
    (0, common_1.Get)('orders/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "getOrder", null);
__decorate([
    (0, common_1.Post)('orders/:id/accept'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "accept", null);
__decorate([
    (0, common_1.Post)('orders/:id/pickup'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "pickup", null);
__decorate([
    (0, common_1.Post)('orders/:id/deliver'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "deliver", null);
__decorate([
    (0, common_1.Post)('orders/:id/fail'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "fail", null);
exports.DeliveryController = DeliveryController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.DELIVERY),
    (0, common_1.Controller)('delivery'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], DeliveryController);
//# sourceMappingURL=delivery.controller.js.map