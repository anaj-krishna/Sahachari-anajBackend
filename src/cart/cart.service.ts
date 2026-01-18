import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart, CartDocument } from './cart.schema';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name)
    private readonly cartModel: Model<CartDocument>,
    private readonly productsService: ProductsService,
  ) {}

  // GET CART
  async getCart(userId: string) {
    const cart = await this.cartModel
      .findOne({ userId })
      .populate('items.productId');
    // Return empty cart if none exists
    return cart || { userId, items: [] };
  }

  // ADD ITEM TO CART (with storeId from product)
  async addToCart(userId: string, dto: AddToCartDto) {
    const { productId, quantity } = dto;

    // 1️⃣ Get product to retrieve storeId
    const product = await this.productsService.findById(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // 2️⃣ Find cart
    let cart = await this.cartModel.findOne({ userId });

    // 3️⃣ Create new cart if it doesn't exist
    if (!cart) {
      cart = await this.cartModel.create({
        userId,
        items: [
          {
            productId: new Types.ObjectId(productId),
            storeId: product.storeId,
            quantity,
          },
        ],
      });
      return cart;
    }

    // 4️⃣ Check if item already exists in cart
    const item = cart.items.find((i) => i.productId.toString() === productId);

    if (item) {
      // ✅ Update quantity
      item.quantity += quantity;
    } else {
      // ✅ Add new CartItem subdocument with storeId
      cart.items.push({
        productId: new Types.ObjectId(productId),
        storeId: product.storeId,
        quantity,
      });
    }
    await cart.save();
    return cart;
  }

  // REMOVE ITEM FROM CART
  async removeItem(userId: string, itemId: string) {
    const cart = await this.cartModel.findOne({ userId });
    if (!cart) throw new NotFoundException('Cart not found');

    // Filter out the item by its _id (subdocument id)
    cart.items = cart.items.filter((i) => i._id && i._id.toString() !== itemId);

    await cart.save();
    return cart;
  }

  // CLEAR CART (used when placing an order)
  async clearCart(userId: string) {
    const cart = await this.cartModel.findOne({ userId });
    if (!cart) return;
    cart.items = [];
    await cart.save();
  }
}
