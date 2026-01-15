/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CartService } from '../../cart/cart.service';

interface JwtUser {
  userId: string;
}

@Controller('customer')
@UseGuards(JwtAuthGuard)
export class CustomerController {
  constructor(
    private readonly cartService: CartService,
  ) {}

  // 🛒 ADD TO CART
  @Post('cart')
  addToCart(
    @Req() req: Request & { user: JwtUser },
    @Body() body: { productId: string; quantity: number },
  ) {
    return this.cartService.addToCart(
      req.user.userId,
      body.productId,
      body.quantity,
    );
  }

  // 🛒 GET CART
  @Get('cart')
  getCart(@Req() req: Request & { user: JwtUser }) {
    return this.cartService.getCart(req.user.userId);
  }

  // 📦 PLACE ORDER (from cart)
 
}
