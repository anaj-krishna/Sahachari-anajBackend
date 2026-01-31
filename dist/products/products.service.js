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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_schema_1 = require("./product.schema");
let ProductsService = class ProductsService {
    productModel;
    constructor(productModel) {
        this.productModel = productModel;
    }
    async create(storeId, dto) {
        return this.productModel.create({
            ...dto,
            storeId: new mongoose_2.Types.ObjectId(storeId),
        });
    }
    async getStoreProductById(storeId, productId) {
        const product = await this.productModel.findOne({
            _id: productId,
            storeId: new mongoose_2.Types.ObjectId(storeId),
        });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return product;
    }
    async updateProduct(storeId, productId, dto) {
        const updatedProduct = await this.productModel.findOneAndUpdate({
            _id: new mongoose_2.Types.ObjectId(productId),
            storeId: new mongoose_2.Types.ObjectId(storeId),
        }, { $set: dto }, { new: true, runValidators: true });
        if (!updatedProduct)
            throw new common_1.NotFoundException('Product not found');
        return updatedProduct;
    }
    async deleteProduct(storeId, productId) {
        const product = await this.productModel.findOneAndDelete({
            _id: productId,
            storeId: new mongoose_2.Types.ObjectId(storeId),
        });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return { message: 'Product deleted successfully' };
    }
    async updateStock(storeId, productId, quantity) {
        const product = await this.productModel.findOneAndUpdate({ _id: productId, storeId: new mongoose_2.Types.ObjectId(storeId) }, { $set: { quantity } }, { new: true, runValidators: true });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return product;
    }
    async addOffer(productId, dto) {
        const offer = {
            type: dto.type,
            value: dto.value,
            isActive: true,
            startDate: dto.startDate ? new Date(dto.startDate) : undefined,
            endDate: dto.endDate ? new Date(dto.endDate) : undefined,
        };
        const product = await this.productModel.findByIdAndUpdate(productId, { $push: { offers: offer } }, { new: true });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return product;
    }
    async findById(id) {
        const product = await this.productModel.findById(id).lean();
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return {
            ...product,
            finalPrice: this.calculateFinalPrice(product),
        };
    }
    async findAll(filters) {
        const query = {};
        if (filters?.search) {
            query['name'] = { $regex: filters.search, $options: 'i' };
        }
        if (filters?.category) {
            query['category'] = filters.category;
        }
        const products = await this.productModel.find(query).lean();
        return products.map((product) => ({
            ...product,
            finalPrice: this.calculateFinalPrice(product),
        }));
    }
    async getStores() {
        return this.productModel.distinct('storeId');
    }
    async getProductsByStore(storeId) {
        return this.productModel
            .find({ storeId: new mongoose_2.Types.ObjectId(storeId) })
            .lean();
    }
    toNumberPrice(price) {
        return Number(String(price || '').replace(/[^0-9.]/g, '')) || 0;
    }
    calculateFinalPrice(product) {
        const basePrice = this.toNumberPrice(product.price);
        if (!product.offers || product.offers.length === 0) {
            return basePrice;
        }
        const now = new Date();
        const activeOffer = product.offers.find((offer) => offer.isActive &&
            (!offer.startDate || offer.startDate <= now) &&
            (!offer.endDate || offer.endDate >= now));
        if (!activeOffer)
            return basePrice;
        if (activeOffer.type === product_schema_1.DiscountType.PERCENTAGE) {
            return Math.max(basePrice - (basePrice * activeOffer.value) / 100, 0);
        }
        if (activeOffer.type === product_schema_1.DiscountType.FLAT) {
            return Math.max(basePrice - activeOffer.value, 0);
        }
        return basePrice;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductsService);
//# sourceMappingURL=products.service.js.map