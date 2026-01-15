import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { ProductsModule } from '../../products/products.module';
import { OrdersModule } from '../../orders/orders.module';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [ProductsModule, OrdersModule, CommonModule],
  controllers: [AdminController],
})
export class AdminModule {}
