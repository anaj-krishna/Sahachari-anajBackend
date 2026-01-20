import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Param,
  Body,
  Req,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';

import { ProductsService } from '../../products/products.service';
import { OrdersService } from '../../orders/orders.service';

import { CreateProductDto } from '../../products/dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller('storekeeper')
export class StorekeeperController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly ordersService: OrdersService,
  ) {}

  /* ================= PRODUCTS ================= */

  @Post('products')
  createProduct(
    @Req() req: Request & { user: { userId: string } },
    @Body() dto: CreateProductDto,
  ) {
    return this.productsService.create(req.user.userId, dto);
  }

  @Get('products')
  getStoreProducts(@Req() req: Request & { user: { userId: string } }) {
    return this.productsService.getProductsByStore(req.user.userId);
  }

  @Get('products/:id')
  getStoreProduct(
    @Req() req: Request & { user: { userId: string } },
    @Param('id') productId: string,
  ) {
    return this.productsService.getStoreProductById(req.user.userId, productId);
  }

  @Put('products/:id')
  updateProduct(
    @Req() req: Request & { user: { userId: string } },
    @Param('id') productId: string,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(req.user.userId, productId, dto);
  }

  @Delete('products/:id')
  deleteProduct(
    @Req() req: Request & { user: { userId: string } },
    @Param('id') productId: string,
  ) {
    return this.productsService.deleteProduct(req.user.userId, productId);
  }

  @Patch('products/:id/stock')
  updateStock(
    @Req() req: Request & { user: { userId: string } },
    @Param('id') productId: string,
    @Body() dto: UpdateStockDto,
  ) {
    return this.productsService.updateStock(
      req.user.userId,
      productId,
      dto.quantity,
    );
  }

  /* ================= ORDERS ================= */

  @Get('orders')
  getStoreOrders(
    @Req() req: Request & { user: { userId: string } },
    @Query('status') status?: string,
  ) {
    return this.ordersService.getOrdersByStore(req.user.userId, status);
  }

  @Get('orders/:id')
  getStoreOrder(
    @Req() req: Request & { user: { userId: string } },
    @Param('id') orderId: string,
  ) {
    return this.ordersService.getStoreOrderById(req.user.userId, orderId);
  }

  /* ================= ORDER ACTIONS ================= */

  @Post('orders/:id/accept')
  acceptOrder(
    @Req() req: Request & { user: { userId: string } },
    @Param('id') orderId: string,
  ) {
    return this.ordersService.acceptOrder(req.user.userId, orderId);
  }

  @Post('orders/:id/reject')
  rejectOrder(
    @Req() req: Request & { user: { userId: string } },
    @Param('id') orderId: string,
  ) {
    return this.ordersService.rejectOrder(req.user.userId, orderId);
  }

  @Post('orders/:id/ready')
  markOrderReady(
    @Req() req: Request & { user: { userId: string } },
    @Param('id') orderId: string,
  ) {
    return this.ordersService.markOrderReady(req.user.userId, orderId);
  }

  /* ================= DELIVERY ASSIGNMENT ================= */

  @Get('orders/:id/available-delivery')
  getAvailableDeliveryBoys(
    @Req() req: Request & { user: { userId: string } },
    @Param('id') orderId: string,
  ) {
    return this.ordersService.getAvailableDeliveryBoys(
      req.user.userId,
      orderId,
    );
  }
}
