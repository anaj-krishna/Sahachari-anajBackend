import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order, OrderDocument, OrderItem } from './order.schema';
import { CartService } from '../cart/cart.service';
import { Product, ProductDocument } from '../products/product.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
    private readonly cartService: CartService,
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  // PLACE ORDER → from cart
  async placeOrder(userId: string) {
    const cart = await this.cartService.getCart(userId);
    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    let total = 0;
    const orderItems: OrderItem[] = [];

    // build order items
    for (const item of cart.items) {
      const product = await this.productModel.findById(item.productId);
      if (!product) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new NotFoundException(`Product ${item.productId} not found`);
      }

      orderItems.push({
        productId: product._id,
        quantity: item.quantity,
        price: product.price,
      });

      total += product.price * item.quantity;
    }

    // create order
    const order = await this.orderModel.create({
      userId: new Types.ObjectId(userId),
      items: orderItems,
      totalAmount: total,
      status: 'PLACED',
    });

    // clear cart
    await this.cartService.clearCart(userId);

    return order;
  }

  // GET ALL ORDERS for user
  async getOrders(userId: string) {
    return this.orderModel
      .find({ userId: new Types.ObjectId(userId) })
      .populate('items.productId')
      .sort({ createdAt: -1 });
  }

  // GET SINGLE ORDER
  async getOrderById(userId: string, orderId: string) {
    const order = await this.orderModel
      .findOne({ _id: orderId, userId: new Types.ObjectId(userId) })
      .populate('items.productId');
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  // CANCEL ORDER (only if not delivered)
  async cancelOrder(userId: string, orderId: string) {
    const order = await this.orderModel.findOne({
      _id: orderId,
      userId: new Types.ObjectId(userId),
    });
    if (!order) throw new NotFoundException('Order not found');
    if (order.status === 'DELIVERED') {
      throw new BadRequestException('Cannot cancel delivered order');
    }
    order.status = 'CANCELLED';
    await order.save();
    return order;
  }
}
