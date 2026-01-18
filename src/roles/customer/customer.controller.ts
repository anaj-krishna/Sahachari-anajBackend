import {
  Controller,
  Get,
  Post,
  Delete,
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
import { CartService } from '../../cart/cart.service';
import { OrdersService } from '../../orders/orders.service';

import { AddToCartDto } from '../../cart/dto/add-to-cart.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.USER)
@Controller('customer')
export class CustomerController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly cartService: CartService,
    private readonly ordersService: OrdersService,
  ) {}

  /* ================= PRODUCTS ================= */

  @Get('products')
  getProducts(
    @Query('search') search?: string,
    @Query('category') category?: string,
  ) {
    return this.productsService.findAll({ search, category });
  }

  @Get('products/:id')
  getProduct(@Param('id') id: string) {
    return this.productsService.findById(id);
  }

  @Get('stores')
  getStores() {
    return this.productsService.getStores();
  }

  @Get('stores/:id/products')
  getStoreProducts(@Param('id') storeId: string) {
    return this.productsService.getProductsByStore(storeId);
  }

  /* ================= CART ================= */

  @Get('cart')
  getCart(@Req() req: Request & { user: { userId: string } }) {
    return this.cartService.getCart(req.user.userId);
  }

  @Post('cart')
  addToCart(
    @Req() req: Request & { user: { userId: string } },
    @Body() dto: AddToCartDto,
  ) {
    return this.cartService.addToCart(req.user.userId, dto);
  }

  @Delete('cart/:itemId')
  removeCartItem(
    @Req() req: Request & { user: { userId: string } },
    @Param('itemId') itemId: string,
  ) {
    return this.cartService.removeItem(req.user.userId, itemId);
  }

  /* ================= ORDERS ================= */

  @Post('orders')
  placeOrder(@Req() req: Request & { user: { userId: string } }) {
    return this.ordersService.placeOrder(req.user.userId);
  }

  @Get('orders')
  getOrders(@Req() req: Request & { user: { userId: string } }) {
    return this.ordersService.getOrders(req.user.userId);
  }

  @Get('orders/:id')
  getOrder(
    @Req() req: Request & { user: { userId: string } },
    @Param('id') orderId: string,
  ) {
    return this.ordersService.getOrderById(req.user.userId, orderId);
  }

  @Post('orders/:id/cancel')
  cancelOrder(
    @Req() req: Request & { user: { userId: string } },
    @Param('id') orderId: string,
  ) {
    return this.ordersService.cancelOrder(req.user.userId, orderId);
  }
}
