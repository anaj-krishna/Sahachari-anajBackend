import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart, CartDocument } from './cart.schema';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name)
    private readonly cartModel: Model<CartDocument>,
  ) {}

  // GET CART
  async getCart(userId: string) {
    const cart = await this.cartModel
      .findOne({ userId })
      .populate('items.productId');
    // Return empty cart if none exists
    return cart || { userId, items: [] };
  }

  // ADD ITEM TO CART
  async addToCart(userId: string, dto: AddToCartDto) {
    const { productId, quantity } = dto;

    // 1️⃣ Find cart
    let cart = await this.cartModel.findOne({ userId });

    // 2️⃣ Create new cart if it doesn't exist
    if (!cart) {
      cart = await this.cartModel.create({
        userId,
        items: [{ productId: new Types.ObjectId(productId), quantity }],
      });
      return cart;
    }

    // 3️⃣ Check if item already exists in cart
    const item = cart.items.find((i) => i.productId.toString() === productId);

    if (item) {
      // ✅ Update quantity
      item.quantity += quantity;
    } else {
      // ✅ Add new CartItem subdocument
      cart.items.push({ productId: new Types.ObjectId(productId), quantity });
    }
    await cart.save(); // Important: save subdocuments
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
