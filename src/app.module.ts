import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { ProductsModule } from './products/products.module';
import { AdminModule } from './roles/admin/admin.module';

@Module({
  imports: [
    AppConfigModule,
    UsersModule,
    AuthModule,
    CommonModule,
    AdminModule,
    ProductsModule,
  ],
})
export class AppModule {}
