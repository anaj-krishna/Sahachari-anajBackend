import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserDocument } from '../users/user.schema';
import { StorekeeperRegisterDto } from './dto/storekeeper-register.dto';
import { DeliveryRegisterDto } from './dto/delivery-register.dto';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  //-----------------------------------------------------------------------------------
  // CUSTOMER REGISTRATION
  //-----------------------------------------------------------------------------------
  async register(dto: RegisterDto) {
    const existing: UserDocument | null = await this.usersService.findByEmail(
      dto.email,
    );

    if (existing) {
      throw new UnauthorizedException('Email already in use');
    }

    const user: UserDocument = await this.usersService.createCustomer(
      dto.name,
      dto.email,
      dto.password,
    );

    return {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      status: user.status,
    };
  }

  //-----------------------------------------------------------------------------------
  // STOREKEEPER REGISTRATION (requires approval)
  //-----------------------------------------------------------------------------------
  async registerStorekeeper(dto: StorekeeperRegisterDto) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) {
      throw new UnauthorizedException('Email already in use');
    }

    const user = await this.usersService.createPendingStaff(
      dto.name,
      dto.email,
      dto.password,
      Role.ADMIN,
    );

    return {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      status: user.status,
      message: 'Registration successful. Awaiting admin approval.',
    };
  }

  //-----------------------------------------------------------------------------------
  // DELIVERY PARTNER REGISTRATION (requires approval)
  //-----------------------------------------------------------------------------------
  async registerDelivery(dto: DeliveryRegisterDto) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) {
      throw new UnauthorizedException('Email already in use');
    }

    const user = await this.usersService.createPendingStaff(
      dto.name,
      dto.email,
      dto.password,
      Role.DELIVERY,
    );

    return {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      status: user.status,
      message: 'Registration successful. Awaiting admin approval.',
    };
  }

  //-----------------------------------------------------------------------------------
  // LOGIN
  //-----------------------------------------------------------------------------------
  async login(dto: LoginDto) {
    const user: UserDocument | null = await this.usersService.findWithPassword(
      dto.email,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const match: boolean = await bcrypt.compare(dto.password, user.password);
    if (!match) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
      status: user.status,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
