import { Module } from '@nestjs/common';
import { DeliveryController } from './delivery.controller';
import { OrdersModule } from '../../orders/orders.module';

@Module({
  imports: [OrdersModule],
  controllers: [DeliveryController],
})
export class DeliveryModule {}
