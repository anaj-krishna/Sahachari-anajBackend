import { Controller, UseGuards, Post, Req, Body } from '@nestjs/common';
import { Request } from 'express';

import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

import { ProductsService } from '../../products/products.service';

@Controller('storekeeper')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class AdminController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('add-products')
  addProduct(
    @Req() req: Request & { user: { userId: string } },
    @Body() dto: any,
  ) {
    const storeId = req.user.userId;
    return this.productsService.create(storeId, dto);
  }
}
