// products/dto/add-offer.dto.ts
import { IsEnum, IsNumber, IsOptional, IsDateString } from 'class-validator';
import { DiscountType } from '../product.schema';

export class AddOfferDto {
  @IsEnum(DiscountType)
  type: DiscountType;

  @IsNumber()
  value: number;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}
