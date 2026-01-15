import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product, ProductDocument } from './product.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(storeId: string, dto: CreateProductDto) {
    return this.productModel.create({
      ...dto,
      storeId: new Types.ObjectId(storeId),
    });
  }
  async findById(id: string) {
    return this.productModel.findById(id);
  }
}
