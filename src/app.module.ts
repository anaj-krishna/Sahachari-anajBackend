import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { CustomerModule } from './roles/customer/customer.module';
import { StorekeeperModule } from './roles/storekeeper/storekeeper.module';

@Module({
  imports: [
    AppConfigModule,
    UsersModule,
    AuthModule,
    CommonModule,
    ProductsModule,
    CartModule,
    CustomerModule,
    StorekeeperModule,
  ],
})
export class AppModule {}
