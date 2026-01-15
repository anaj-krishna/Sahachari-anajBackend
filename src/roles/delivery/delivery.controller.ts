import { Controller, UseGuards, Get, Post, Param, Req } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { OrdersService } from '../../orders/orders.service';
import { OrderStatus } from '../../orders/order.schema';

@Controller('delivery')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.DELIVERY)
export class DeliveryController {
  constructor(private readonly ordersService: OrdersService) {}

  // all ready-to-pick orders
  @Get('orders')
  getAvailableOrders() {
    return this.ordersService.findByStatus(OrderStatus.READY);
  }

  // pick an order
  @Post('orders/:id/pick')
  pickOrder(
    @Req() req: Request & { user: { userId: string } },
    @Param('id') orderId: string,
  ) {
    return this.ordersService.assignDelivery(orderId, req.user.userId);
  }

  // mark delivered
  @Post('orders/:id/deliver')
  deliver(@Param('id') orderId: string) {
    return this.ordersService.updateStatus(orderId, OrderStatus.DELIVERED);
  }
}
