import {
  Controller,
  Get,
  Post,
  Param,
  Req,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';

import { OrdersService } from '../../orders/orders.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.DELIVERY)
@Controller('delivery')
export class DeliveryController {
  constructor(private readonly ordersService: OrdersService) {}

  /**
   * AVAILABLE JOBS or MY JOBS
   * GET /delivery/orders?status=READY
   * GET /delivery/orders?mine=true
   */
  @Get('orders')
  async getOrders(
    @Req() req: Request & { user: { userId: string } },
    @Query('status') status?: string,
    @Query('mine') mine?: string,
  ) {
    if (mine === 'true') {
      return this.ordersService.getMyJobs(req.user.userId);
    }

    if (status === 'READY') {
      return this.ordersService.getAvailableJobs();
    }

    return [];
  }

  /**
   * MY JOBS (explicit)
   * GET /delivery/orders/me
   */
  @Get('orders/me')
  async myJobs(@Req() req: Request & { user: { userId: string } }) {
    return this.ordersService.getMyJobs(req.user.userId);
  }

  /**
   * SINGLE ORDER
   */
  @Get('orders/:id')
  async getOrder(
    @Param('id') orderId: string,
    @Req() req: Request & { user: { userId: string } },
  ) {
    return this.ordersService.getDeliveryOrderById(req.user.userId, orderId);
  }

  /**
   * ACCEPT JOB
   */
  @Post('orders/:id/accept')
  async accept(
    @Param('id') orderId: string,
    @Req() req: Request & { user: { userId: string } },
  ) {
    return this.ordersService.acceptJob(req.user.userId, orderId);
  }

  /**
   * PICKUP
   */
  @Post('orders/:id/pickup')
  async pickup(
    @Param('id') orderId: string,
    @Req() req: Request & { user: { userId: string } },
  ) {
    return this.ordersService.pickupOrder(req.user.userId, orderId);
  }

  /**
   * DELIVER
   */
  @Post('orders/:id/deliver')
  async deliver(
    @Param('id') orderId: string,
    @Req() req: Request & { user: { userId: string } },
  ) {
    return this.ordersService.deliverOrder(req.user.userId, orderId);
  }

  /**
   * FAIL
   */
  @Post('orders/:id/fail')
  async fail(
    @Param('id') orderId: string,
    @Req() req: Request & { user: { userId: string } },
  ) {
    return this.ordersService.failDelivery(req.user.userId, orderId);
  }
}
