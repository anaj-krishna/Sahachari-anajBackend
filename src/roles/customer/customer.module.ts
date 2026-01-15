import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { OrdersModule } from '../../orders/orders.module';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [OrdersModule, CommonModule],
  controllers: [CustomerController],
})
export class CustomerModule {}
