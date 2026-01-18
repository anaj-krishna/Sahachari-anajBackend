import {
  IsString,
  IsOptional,
  IsPhoneNumber,
  MinLength,
} from 'class-validator';

export class PlaceOrderDto {
  @IsString()
  @MinLength(5)
  street: string;

  @IsString()
  @MinLength(2)
  city: string;

  @IsString()
  @MinLength(5)
  zipCode: string;

  @IsString()
  @IsPhoneNumber()
  phone: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
