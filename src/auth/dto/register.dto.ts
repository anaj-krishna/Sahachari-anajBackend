/* eslint-disable prettier/prettier */
import {
  IsString,
  IsEmail,
  MinLength,
  IsArray,
  IsEnum,
  ArrayNotEmpty,
  IsOptional, // Use this for optional fields
} from 'class-validator';
import { Role } from '../../common/enums/role.enum';

export class RegisterDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  address: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  serviceablePincodes: string[];

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(Role)
  role: Role;

  // FIX: Use @IsOptional instead of passing required: false
  @IsOptional()
  @IsString()
  address2?: string;

  // FIX: Remove @Prop (Mongoose only) and use validator decorators
  @IsOptional()
  @IsString()
  mobileNumber?: string;
} 