import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class OrderItem {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number; // snapshot price at the time of order
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

@Schema({ _id: false })
export class DeliveryAddress {
  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  zipCode: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: false })
  notes?: string;
}

const DeliveryAddressSchema = SchemaFactory.createForClass(DeliveryAddress);

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  storeId: Types.ObjectId;

  @Prop({ type: String, required: true })
  checkoutId: string;

  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  deliveryBoyId?: Types.ObjectId;

  @Prop({ type: [OrderItemSchema], required: true })
  items: OrderItem[];

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ type: DeliveryAddressSchema, required: true })
  deliveryAddress: DeliveryAddress;

  @Prop({ default: 'PLACED' })
  status:
    | 'PLACED'
    | 'ACCEPTED'
    | 'REJECTED'
    | 'READY'
    | 'PICKED_UP'
    | 'DELIVERED'
    | 'FAILED'
    | 'CANCELLED';
}

export const OrderSchema = SchemaFactory.createForClass(Order);
