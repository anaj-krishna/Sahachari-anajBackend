import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  images?: string[];

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: string;

  @IsOptional()
  @IsString()
  category?: string;
}
