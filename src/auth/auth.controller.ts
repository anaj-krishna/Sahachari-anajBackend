import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { StorekeeperRegisterDto } from './dto/storekeeper-register.dto';
import { DeliveryRegisterDto } from './dto/delivery-register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Customer Registration
  @Post('register/customer')
  async registerCustomer(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  // Storekeeper Registration (requires approval)
  @Post('register/storekeeper')
  async registerStorekeeper(@Body() dto: StorekeeperRegisterDto) {
    return this.authService.registerStorekeeper(dto);
  }

  // Delivery Partner Registration (requires approval)
  @Post('register/delivery')
  async registerDelivery(@Body() dto: DeliveryRegisterDto) {
    return this.authService.registerDelivery(dto);
  }

  // Login
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
