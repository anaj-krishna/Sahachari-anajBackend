import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { OrdersService } from '../../orders/orders.service';
import { CreateOrderDto } from '../../orders/dto/create-order.dto';

interface JwtUser {
  userId: string;
}

@Controller('customer')
@UseGuards(JwtAuthGuard)
export class CustomerController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('orders')
  createOrder(
    @Req() req: Request & { user: JwtUser },
    @Body() dto: CreateOrderDto,
  ) {
    return this.ordersService.create(req.user.userId, dto);
  }

  @Get('orders')
  getMyOrders(@Req() req: Request & { user: JwtUser }) {
    return this.ordersService.findByCustomer(req.user.userId);
  }
}
