import {
  Controller,
  UseGuards,
  Post,
  Req,
  Body,
  Get,
  Param,
} from '@nestjs/common';
import { Request } from 'express';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ProductsService } from '../../products/products.service';
import { CreateProductDto } from '../../products/dto/create-product.dto';
import { OrdersService } from '../../orders/orders.service';
import { OrderStatus } from '../../orders/order.schema';

@Controller('storekeeper')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class AdminController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly ordersService: OrdersService,
  ) {}

  // existing product route
  @Post('add-products')
  addProduct(
    @Req() req: Request & { user: { userId: string } },
    @Body() dto: CreateProductDto,
  ) {
    return this.productsService.create(req.user.userId, dto);
  }

  // 🆕 get incoming orders
  @Get('orders')
  getOrders(@Req() req: Request & { user: { userId: string } }) {
    return this.ordersService.findByStore(req.user.userId, OrderStatus.CREATED);
  }

  // 🆕 accept order
  @Post('orders/:id/accept')
  acceptOrder(@Param('id') orderId: string) {
    return this.ordersService.updateStatus(orderId, OrderStatus.ACCEPTED);
  }

  // 🆕 mark order ready
  @Post('orders/:id/ready')
  markReady(@Param('id') orderId: string) {
    return this.ordersService.updateStatus(orderId, OrderStatus.READY);
  }
}
