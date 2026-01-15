import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart, CartDocument } from './cart.schema';

@Injectable()
export class CartService {
  clearCart: any;
  constructor(
    @InjectModel(Cart.name)
    private readonly cartModel: Model<CartDocument>,
  ) {}

  async getCart(customerId: string) {
    return this.cartModel.findOne({ customerId }).populate('items.productId');
  }

  async addToCart(customerId: string, productId: string, quantity: number) {
    let cart = await this.cartModel.findOne({ customerId });

    // 1️⃣ Create cart if not exists
    if (!cart) {
      cart = await this.cartModel.create({
        customerId,
        items: [
          {
            productId: new Types.ObjectId(productId),
            quantity,
          },
        ],
      });
      return cart;
    }

    // 2️⃣ Check if product already in cart
    const item = cart.items.find((i) => i.productId.toString() === productId);

    if (item) {
      item.quantity += quantity;
    } else {
      cart.items.push({
        productId: new Types.ObjectId(productId),
        quantity,
      });
    }

    await cart.save();
    return cart;
  }
}
