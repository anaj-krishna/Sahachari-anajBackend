import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order, OrderDocument, OrderStatus } from './order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
    private readonly productsService: ProductsService,
  ) {}

  // CUSTOMER CREATE ORDER (SAFE)
  async create(customerId: string, dto: CreateOrderDto) {
    let totalAmount = 0;
    const items: Array<{
      productId: Types.ObjectId;
      name: string;
      price: number;
      quantity: number;
    }> = [];

    for (const i of dto.items) {
      const product = await this.productsService.findById(i.productId);
      if (!product) throw new NotFoundException('Product not found');

      items.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: i.quantity,
      });

      totalAmount += product.price * i.quantity;
    }

    return this.orderModel.create({
      customerId: new Types.ObjectId(customerId),
      storeId: new Types.ObjectId(dto.storeId),
      items,
      totalAmount,
      customerAddress: dto.customerAddress,
      storeAddress: dto.storeAddress,
      status: OrderStatus.CREATED,
    });
  }

  // CUSTOMER
  async findByCustomer(customerId: string) {
    return this.orderModel.find({
      customerId: new Types.ObjectId(customerId),
    });
  }

  // STOREKEEPER
  async findByStore(storeId: string, status?: OrderStatus) {
    const query: { storeId: Types.ObjectId; status?: OrderStatus } = {
      storeId: new Types.ObjectId(storeId),
    };
    if (status) query.status = status;
    return this.orderModel.find(query);
  }

  async updateStatus(orderId: string, status: OrderStatus) {
    return this.orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true },
    );
  }

  // DELIVERY
  async findByStatus(status: OrderStatus) {
    return this.orderModel.find({ status });
  }

  async assignDelivery(orderId: string, deliveryUserId: string) {
    const order = await this.orderModel.findOneAndUpdate(
      { _id: orderId, status: OrderStatus.READY },
      {
        status: OrderStatus.ASSIGNED,
        deliveryUserId: new Types.ObjectId(deliveryUserId),
      },
      { new: true },
    );

    if (!order) throw new NotFoundException('Order not available');
    return order;
  }
}
