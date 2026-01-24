import {
  IsString,
  IsEmail,
  MinLength,
  IsArray,
  IsEnum,
  ArrayNotEmpty,
} from 'class-validator';
import { Role } from '../../common/enums/role.enum';

export class RegisterDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  shopAddress: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  serviceablePincodes: string[];

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(Role)
  role: Role; // USER | ADMIN | DELIVERY
}
