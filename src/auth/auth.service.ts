/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserDocument } from '../users/user.schema';
import { Role } from '../common/enums/role.enum';
import { AccountStatus } from 'src/common/enums/account-status.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  //-----------------------------------------------------------------------------------
  // SINGLE REGISTRATION
  //-----------------------------------------------------------------------------------
  async register(dto: RegisterDto) {
  const existing = await this.usersService.findByEmail(dto.email);
  if (existing) {
    throw new UnauthorizedException('Email already in use');
  }

  const status =
    dto.role === Role.USER
      ? AccountStatus.ACTIVE
      : AccountStatus.PENDING;

  const user = await this.usersService.createUser({
    name: dto.name,
    email: dto.email,
    password: dto.password,
    role: dto.role,
    status,
    address: dto.address,
    serviceablePincodes: dto.serviceablePincodes,
  });

  return {
    id: user._id.toString(),
    email: user.email,
    role: user.role,
    status: user.status,
    message:
      dto.role === Role.USER
        ? 'Registration successful'
        : 'Registration successful. Awaiting admin approval.',
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
