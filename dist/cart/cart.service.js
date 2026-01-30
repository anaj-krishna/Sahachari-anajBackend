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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cart_schema_1 = require("./cart.schema");
const products_service_1 = require("../products/products.service");
let CartService = class CartService {
    cartModel;
    productsService;
    constructor(cartModel, productsService) {
        this.cartModel = cartModel;
        this.productsService = productsService;
    }
    async getCart(userId) {
        if (!userId)
            throw new common_1.BadRequestException('userId missing');
        const userObjectId = new mongoose_2.Types.ObjectId(userId);
        const cart = await this.cartModel
            .findOne({ userId: userObjectId })
            .populate('items.productId');
        return cart ?? { userId, items: [] };
    }
    async addToCart(userId, dto) {
        if (!userId)
            throw new common_1.BadRequestException('userId missing');
        const userObjectId = new mongoose_2.Types.ObjectId(userId);
        const { productId, quantity } = dto;
        const product = await this.productsService.findById(productId);
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        let cart = await this.cartModel.findOne({ userId: userObjectId });
        if (!cart) {
            cart = await this.cartModel.create({
                userId: userObjectId,
                items: [
                    {
                        productId: new mongoose_2.Types.ObjectId(productId),
                        storeId: product.storeId,
                        quantity,
                    },
                ],
            });
            return cart;
        }
        const item = cart.items.find((i) => i.productId.toString() === productId);
        if (item) {
            item.quantity += quantity;
        }
        else {
            cart.items.push({
                productId: new mongoose_2.Types.ObjectId(productId),
                storeId: product.storeId,
                quantity,
            });
        }
        await cart.save();
        return cart;
    }
    async removeItem(userId, itemId) {
        if (!userId)
            throw new common_1.BadRequestException('userId missing');
        const userObjectId = new mongoose_2.Types.ObjectId(userId);
        const cart = await this.cartModel.findOne({ userId: userObjectId });
        if (!cart)
            throw new common_1.NotFoundException('Cart not found');
        cart.items = cart.items.filter((i) => i._id && i._id.toString() !== itemId);
        await cart.save();
        return cart;
    }
    async clearCart(userId) {
        if (!userId)
            throw new common_1.BadRequestException('userId missing');
        const userObjectId = new mongoose_2.Types.ObjectId(userId);
        const cart = await this.cartModel.findOne({ userId: userObjectId });
        if (!cart)
            return;
        cart.items = [];
        await cart.save();
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(cart_schema_1.Cart.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        products_service_1.ProductsService])
], CartService);
//# sourceMappingURL=cart.service.js.map