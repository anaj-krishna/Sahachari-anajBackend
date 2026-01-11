import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { ProductsModule } from '../../products/products.module';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [ProductsModule, CommonModule],
  controllers: [AdminController],
})
export class AdminModule {}
