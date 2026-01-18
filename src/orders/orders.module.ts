import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersService } from './orders.service';
import { Order, OrderSchema } from './order.schema';
import { CartModule } from '../cart/cart.module';
import { Product, ProductSchema } from '../products/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
    CartModule, // needed to clear cart after placing order
  ],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
