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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = exports.Order = exports.DeliveryAddress = exports.OrderItemSchema = exports.OrderItem = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let OrderItem = class OrderItem {
    productId;
    quantity;
    price;
};
exports.OrderItem = OrderItem;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Product', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], OrderItem.prototype, "productId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], OrderItem.prototype, "quantity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], OrderItem.prototype, "price", void 0);
exports.OrderItem = OrderItem = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], OrderItem);
exports.OrderItemSchema = mongoose_1.SchemaFactory.createForClass(OrderItem);
let DeliveryAddress = class DeliveryAddress {
    street;
    city;
    zipCode;
    phone;
    notes;
};
exports.DeliveryAddress = DeliveryAddress;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], DeliveryAddress.prototype, "street", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], DeliveryAddress.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], DeliveryAddress.prototype, "zipCode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], DeliveryAddress.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], DeliveryAddress.prototype, "notes", void 0);
exports.DeliveryAddress = DeliveryAddress = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], DeliveryAddress);
const DeliveryAddressSchema = mongoose_1.SchemaFactory.createForClass(DeliveryAddress);
let Order = class Order {
    userId;
    storeId;
    checkoutId;
    deliveryBoyId;
    items;
    totalAmount;
    deliveryAddress;
    status;
};
exports.Order = Order;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Order.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Order.prototype, "storeId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Order.prototype, "checkoutId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', default: null }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Order.prototype, "deliveryBoyId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.OrderItemSchema], required: true }),
    __metadata("design:type", Array)
], Order.prototype, "items", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Order.prototype, "totalAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: DeliveryAddressSchema, required: true }),
    __metadata("design:type", DeliveryAddress)
], Order.prototype, "deliveryAddress", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'PLACED' }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
exports.Order = Order = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Order);
exports.OrderSchema = mongoose_1.SchemaFactory.createForClass(Order);
//# sourceMappingURL=order.schema.js.map