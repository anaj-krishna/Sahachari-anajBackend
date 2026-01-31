/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards, Req, Patch, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Request } from 'express';
import { UsersService } from './users.service'; // Added
import { User } from './user.schema';           // Added

interface JwtUser {
  userId: string;
  email: string;
  role: string;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req: Request & { user: JwtUser }) {
    // Awaiting the service call to fetch address & pincodes from DB
    const user = await this.usersService.getById(req.user.userId);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-me')
  async updateMe(
    @Req() req: Request & { user: JwtUser }, 
    @Body() updateData: Partial<User> // Partial<User> allows updating any field
  ) {
    return await this.usersService.updateProfile(req.user.userId, updateData);
  }
}