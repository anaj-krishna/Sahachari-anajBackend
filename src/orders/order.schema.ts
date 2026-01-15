import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

export enum OrderStatus {
  CREATED = 'CREATED',
  ACCEPTED = 'ACCEPTED',
  READY = 'READY',
  ASSIGNED = 'ASSIGNED',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  customerId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) // storekeeper
  storeId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  deliveryUserId: Types.ObjectId | null;

  @Prop([
    {
      productId: { type: Types.ObjectId, ref: 'Product' },
      name: String,
      price: Number,
      quantity: Number,
    },
  ])
  items: {
    productId: Types.ObjectId;
    name: string;
    price: number;
    quantity: number;
  }[];

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ required: true })
  storeAddress: string;

  @Prop({ required: true })
  customerAddress: string;

  @Prop({ enum: OrderStatus, default: OrderStatus.CREATED })
  status: OrderStatus;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
