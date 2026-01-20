import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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
    if (!userId) throw new BadRequestException('userId missing');

    const userObjectId = new Types.ObjectId(userId);

    const cart = await this.cartModel
      .findOne({ userId: userObjectId })
      .populate('items.productId');

    return cart ?? { userId, items: [] };
  }

  // ADD ITEM TO CART
  async addToCart(userId: string, dto: AddToCartDto) {
    if (!userId) throw new BadRequestException('userId missing');

    const userObjectId = new Types.ObjectId(userId);
    const { productId, quantity } = dto;

    const product = await this.productsService.findById(productId);
    if (!product) throw new NotFoundException('Product not found');

    let cart = await this.cartModel.findOne({ userId: userObjectId });

    if (!cart) {
      cart = await this.cartModel.create({
        userId: userObjectId,
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

    const item = cart.items.find((i) => i.productId.toString() === productId);

    if (item) {
      item.quantity += quantity;
    } else {
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
    if (!userId) throw new BadRequestException('userId missing');

    const userObjectId = new Types.ObjectId(userId);

    const cart = await this.cartModel.findOne({ userId: userObjectId });
    if (!cart) throw new NotFoundException('Cart not found');

    cart.items = cart.items.filter((i) => i._id && i._id.toString() !== itemId);

    await cart.save();
    return cart;
  }

  // CLEAR CART
  async clearCart(userId: string) {
    if (!userId) throw new BadRequestException('userId missing');

    const userObjectId = new Types.ObjectId(userId);

    const cart = await this.cartModel.findOne({ userId: userObjectId });
    if (!cart) return;

    cart.items = [];
    await cart.save();
  }
}
