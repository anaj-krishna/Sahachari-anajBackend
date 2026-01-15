/* eslint-disable prettier/prettier */
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
import { AddOfferDto } from '../../products/dto/add-offer.dto';

@Controller('storekeeper')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class AdminController {
  constructor(
    private readonly productsService: ProductsService
  ) {}

  // ➕ ADD PRODUCT
  @Post('products')
  addProduct(
    @Req() req: Request & { user: { userId: string } },
    @Body() dto: CreateProductDto,
  ) {
    return this.productsService.create(req.user.userId, dto);
  }

  // 📦 GET PRODUCTS (WITH ACTIVE OFFERS)
  @Get('products')
  getProducts() {
    return this.productsService.getAllProduct();
  }

  @Post('products/:id/offers')
  addOffer(@Param('id') productId: string, @Body() dto: AddOfferDto) {
    return this.productsService.addOffer(productId, {
      ...dto,
      startDate: dto.startDate ? new Date(dto.startDate) : undefined,
      endDate: dto.endDate ? new Date(dto.endDate) : undefined,
    });
  }

  // 🎯 GET OFFERS OF A PRODUCT
  @Get('products/:id/offers')
  getOffers(@Param('id') productId: string) {
    return this.productsService.getOffers(productId);
  }

  // 📥 GET INCOMING ORDERS
 
}
