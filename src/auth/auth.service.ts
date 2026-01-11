import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserDocument } from '../users/user.schema';
import { StaffRegisterDto } from './dto/staff-register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
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
    };
  }
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
  // -----------------------------------------------------------------------------------
  async registerStaff(dto: StaffRegisterDto) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) {
      throw new UnauthorizedException('Email already in use');
    }

    const user = await this.usersService.createPendingStaff(
      dto.name,
      dto.email,
      dto.password,
      dto.role,
    );

    return {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      status: user.status,
    };
  }
}
