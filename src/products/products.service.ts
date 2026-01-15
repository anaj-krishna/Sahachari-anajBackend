import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product, ProductDocument, DiscountType } from './product.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  // CREATE PRODUCT
  async create(storeId: string, dto: CreateProductDto) {
    return this.productModel.create({
      ...dto,
      storeId: new Types.ObjectId(storeId),
    });
  }

  // GET PRODUCT BY ID
  async findById(id: string) {
    const product = await this.productModel.findById(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async getAllProduct() {
    const product = await this.productModel.find({});
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }
  // 🔥 GET PRODUCTS WITH ACTIVE OFFERS
  async findAllWithOffers() {
    const now = new Date();

    const products = await this.productModel.find({
      offers: {
        $elemMatch: {
          isActive: true,
          $or: [
            { startDate: { $lte: now }, endDate: { $gte: now } },
            { startDate: null, endDate: null },
          ],
        },
      },
    });

    return products.map((p) => ({
      ...p.toObject(),
      finalPrice: this.calculateFinalPrice(p),
    }));
  }

  // ➕ ADD OFFER TO PRODUCT
  async addOffer(
    productId: string,
    offer: {
      type: DiscountType;
      value: number;
      startDate?: Date;
      endDate?: Date;
    },
  ) {
    const product = await this.productModel.findByIdAndUpdate(
      productId,
      {
        $push: {
          offers: {
            ...offer,
            isActive: true,
          },
        },
      },
      { new: true },
    );

    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  // 📦 GET OFFERS OF A PRODUCT
  async getOffers(productId: string) {
    const product = await this.productModel.findById(productId, {
      offers: 1,
    });

    if (!product) throw new NotFoundException('Product not found');
    return product.offers;
  }

  // 💰 FINAL PRICE CALCULATION
  private calculateFinalPrice(product: ProductDocument): number {
    const now = new Date();

    const activeOffer = product.offers.find(
      (o) =>
        o.isActive &&
        (!o.startDate || o.startDate <= now) &&
        (!o.endDate || o.endDate >= now),
    );

    if (!activeOffer) return product.price;

    if (activeOffer.type === DiscountType.PERCENTAGE) {
      return Math.max(
        product.price - (product.price * activeOffer.value) / 100,
        0,
      );
    }

    if (activeOffer.type === DiscountType.FLAT) {
      return Math.max(product.price - activeOffer.value, 0);
    }

    return product.price;
  }
}
