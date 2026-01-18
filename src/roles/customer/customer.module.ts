import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CartModule } from '../../cart/cart.module';
import { OrdersModule } from '../../orders/orders.module';
import { UsersModule } from '../../users/users.module';
import { ProductsModule } from '../../products/products.module';

@Module({
  imports: [ProductsModule, CartModule, OrdersModule, UsersModule],
  controllers: [CustomerController],
  providers: [], // optional: if you want a facade service for customer
})
export class CustomerModule {}
