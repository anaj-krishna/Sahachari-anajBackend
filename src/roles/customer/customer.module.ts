import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CommonModule } from '../../common/common.module';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [CommonModule, CartModule],
  controllers: [CustomerController],
})
export class CustomerModule {}
