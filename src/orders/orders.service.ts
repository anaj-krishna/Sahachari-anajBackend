/* eslint-disable prettier/prettier */
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order, OrderDocument, OrderItem } from './order.schema';
import { CartService } from '../cart/cart.service';
import { CartItem } from '../cart/cart.schema';
import { Product, ProductDocument } from '../products/product.schema';
import { PlaceOrderDto } from './dto/place-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
    private readonly cartService: CartService,
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  // PLACE ORDER → from cart, split by store
  async placeOrder(userId: string, dto: PlaceOrderDto) {
    const cart = await this.cartService.getCart(userId);
    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    // Generate unique checkoutId to group all orders from this checkout
    const checkoutId = `CHECKOUT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Group cart items by storeId
    const itemsByStore = new Map<string, CartItem[]>();
    for (const item of cart.items) {
      const storeId = item.storeId.toString();
      if (!itemsByStore.has(storeId)) {
        itemsByStore.set(storeId, []);
      }
      itemsByStore.get(storeId)?.push(item);
    }

    // Create one order per store
    const createdOrders: OrderDocument[] = [];
    for (const [storeId, items] of itemsByStore.entries()) {
      let storeTotal = 0;
      const orderItems: OrderItem[] = [];

      // Build order items for this store
     for (const item of items) {
  const product = await this.productModel.findById(item.productId);

  if (!product) {
    throw new NotFoundException(
      `Product ${item.productId.toString()} not found`,
    );
  }

  const numericPrice = Number(String(product.price).replace(/[^0-9.]/g, ''));

  orderItems.push({
    productId: product._id,
    quantity: item.quantity,
    price: numericPrice, // store as number
  });

  storeTotal += numericPrice * item.quantity;
}


      // Create order for this store
      const order = await this.orderModel.create({
        userId: new Types.ObjectId(userId),
        storeId: new Types.ObjectId(storeId),
        checkoutId,
        items: orderItems,
        totalAmount: storeTotal,
        deliveryAddress: dto,
        status: 'PLACED',
      });

      createdOrders.push(order);
    }

    // Clear cart after creating all orders
    await this.cartService.clearCart(userId);

    return {
      checkoutId,
      ordersCount: createdOrders.length,
      totalAmount: createdOrders.reduce(
        (sum, order) => sum + order.totalAmount,
        0,
      ),
      orders: createdOrders,
    };
  }

  // GET ALL ORDERS for user (optionally filter by checkout)
  async getOrders(userId: string, checkoutId?: string) {
    const query: { userId: Types.ObjectId; checkoutId?: string } = {
      userId: new Types.ObjectId(userId),
    };
    if (checkoutId) {
      query.checkoutId = checkoutId;
    }
    return this.orderModel
      .find(query)
      .populate('items.productId')
      .populate('storeId', 'name')
      .sort({ createdAt: -1 });
  }

  // GET ORDERS BY CHECKOUT (all orders from one checkout session)
  async getOrdersByCheckout(userId: string, checkoutId: string) {
    return this.orderModel
      .find({ userId: new Types.ObjectId(userId), checkoutId })
      .populate('items.productId')
      .populate('storeId', 'name')
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
    const order = await this.orderModel.findOneAndUpdate(
      {
        _id: orderId,
        userId: new Types.ObjectId(userId),
        status: { $ne: 'DELIVERED' },
      },
      {
        $set: { status: 'CANCELLED' },
      },
      { new: true },
    );

    if (!order) {
      throw new NotFoundException('Order not found or cannot be cancelled');
    }

    return order;
  }

  /* ================= STOREKEEPER OPERATIONS ================= */

  // GET ORDERS BY STORE with optional status filter
  async getOrdersByStore(storeId: string, status?: string) {
    const query: { storeId: Types.ObjectId; status?: string } = {
      storeId: new Types.ObjectId(storeId),
    };
    if (status) {
      query.status = status;
    }
    return this.orderModel
      .find(query)
      .populate('items.productId')
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
  }

  // GET SINGLE ORDER for store
  async getStoreOrderById(storeId: string, orderId: string) {
    const order = await this.orderModel
      .findOne({
        _id: orderId,
        storeId: new Types.ObjectId(storeId),
      })
      .populate('items.productId')
      .populate('userId', 'name email phone');

    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  // ACCEPT ORDER
  async acceptOrder(storeId: string, orderId: string) {
    const order = await this.orderModel.findOneAndUpdate(
      {
        _id: orderId,
        storeId: new Types.ObjectId(storeId),
        status: 'PLACED',
      },
      {
        $set: { status: 'ACCEPTED' },
      },
      { new: true },
    );

    if (!order) {
      throw new NotFoundException('Order not found or cannot be accepted');
    }

    return order;
  }

  // REJECT ORDER
  async rejectOrder(storeId: string, orderId: string) {
    const order = await this.orderModel.findOneAndUpdate(
      {
        _id: orderId,
        storeId: new Types.ObjectId(storeId),
        status: 'PLACED',
      },
      {
        $set: { status: 'REJECTED' },
      },
      { new: true },
    );

    if (!order) {
      throw new NotFoundException('Order not found or cannot be rejected');
    }

    return order;
  }

  // MARK ORDER AS READY
  async markOrderReady(storeId: string, orderId: string) {
    const order = await this.orderModel.findOneAndUpdate(
      {
        _id: orderId,
        storeId: new Types.ObjectId(storeId),
        status: 'ACCEPTED',
      },
      {
        $set: { status: 'READY' },
      },
      { new: true },
    );

    if (!order) {
      throw new NotFoundException('Order not found or not in ACCEPTED status');
    }

    return order;
  }

  // GET AVAILABLE DELIVERY BOYS (placeholder - needs user service)
  async getAvailableDeliveryBoys(storeId: string, orderId: string) {
    // Verify order exists
    const order = await this.orderModel.findOne({
      _id: orderId,
      storeId: new Types.ObjectId(storeId),
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // TODO: Integrate with user service to get delivery boys
    // For now, return empty array - implement when user service is ready
    return {
      orderId,
      availableDeliveryBoys: [],
      message: 'Delivery boy list not yet configured',
    };
  }
  /* ================= DELIVERY BOY OPERATIONS ================= */

  // GET AVAILABLE JOBS (status = READY, no deliveryBoyId assigned)
  async getAvailableJobs() {
    return this.orderModel
      .find({
        status: 'READY',
        deliveryBoyId: null,
      })
      .populate('items.productId')
      .populate('userId', 'name phone')
      .populate('storeId', 'name address phone')
      .sort({ createdAt: -1 });
  }

  // GET MY JOBS (assigned to delivery boy)
  async getMyJobs(deliveryBoyId: string) {
    return this.orderModel
      .find({
        deliveryBoyId: new Types.ObjectId(deliveryBoyId),
        status: { $in: ['ACCEPTED', 'PICKED_UP', 'DELIVERED', 'FAILED'] },
      })
      .populate('items.productId')
      .populate('userId', 'name phone email')
      .populate('storeId', 'name address phone')
      .sort({ createdAt: -1 });
  }

  // GET SINGLE ORDER FOR DELIVERY BOY
  async getDeliveryOrderById(deliveryBoyId: string, orderId: string) {
    const order = await this.orderModel
      .findOne({
        _id: orderId,
        deliveryBoyId: new Types.ObjectId(deliveryBoyId),
      })
      .populate('items.productId')
      .populate('userId', 'name phone email')
      .populate('storeId', 'name address phone')
      .populate('deliveryBoyId', 'name phone');

    if (!order) {
      throw new NotFoundException('Order not found or not assigned to you');
    }

    return order;
  }

  // ACCEPT JOB (READY → ACCEPTED, assign deliveryBoyId)
  async acceptJob(deliveryBoyId: string, orderId: string) {
    const order = await this.orderModel.findOneAndUpdate(
      {
        _id: orderId,
        status: 'READY',
        deliveryBoyId: null,
      },
      {
        $set: {
          status: 'ACCEPTED',
          deliveryBoyId: new Types.ObjectId(deliveryBoyId),
        },
      },
      { new: true },
    );

    if (!order) {
      throw new NotFoundException(
        'Order not found, already assigned, or not in READY status',
      );
    }

    return order;
  }

  // PICKUP (ACCEPTED → PICKED_UP)
  async pickupOrder(deliveryBoyId: string, orderId: string) {
    const order = await this.orderModel.findOneAndUpdate(
      {
        _id: orderId,
        deliveryBoyId: new Types.ObjectId(deliveryBoyId),
        status: 'ACCEPTED',
      },
      {
        $set: { status: 'PICKED_UP' },
      },
      { new: true },
    );

    if (!order) {
      throw new NotFoundException(
        'Order not found, not assigned to you, or not in ACCEPTED status',
      );
    }

    return order;
  }

  // DELIVER (PICKED_UP → DELIVERED)
  async deliverOrder(deliveryBoyId: string, orderId: string) {
    const order = await this.orderModel.findOneAndUpdate(
      {
        _id: orderId,
        deliveryBoyId: new Types.ObjectId(deliveryBoyId),
        status: 'PICKED_UP',
      },
      {
        $set: { status: 'DELIVERED' },
      },
      { new: true },
    );

    if (!order) {
      throw new NotFoundException(
        'Order not found, not assigned to you, or not in PICKED_UP status',
      );
    }

    return order;
  }
  // FAIL DELIVERY (PICKED_UP → FAILED)
  async failDelivery(deliveryBoyId: string, orderId: string) {
    const order = await this.orderModel.findOneAndUpdate(
      {
        _id: orderId,
        deliveryBoyId: new Types.ObjectId(deliveryBoyId),
        status: 'PICKED_UP',
      },
      {
        $set: { status: 'FAILED' },
      },
      { new: true },
    );
    if (!order) {
      throw new NotFoundException(
        'Order not found, not assigned to you, or not in PICKED_UP status',
      );
    }
    return order;
  }
}
