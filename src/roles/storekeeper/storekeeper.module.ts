import { Module } from '@nestjs/common';
import { StorekeeperController } from './storekeeper.controller';
import { ProductsModule } from '../../products/products.module';
import { OrdersModule } from '../../orders/orders.module';

@Module({
  imports: [ProductsModule, OrdersModule],
  controllers: [StorekeeperController],
})
export class StorekeeperModule {}
