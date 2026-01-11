import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
import { Role } from '../common/enums/role.enum';
import { AccountStatus } from '../common/enums/account-status.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  // CUSTOMER signup (auto active)
  async createCustomer(
    name: string,
    email: string,
    password: string,
  ): Promise<UserDocument> {
    const hashed = await bcrypt.hash(password, 10);

    return this.userModel.create({
      name,
      email,
      password: hashed,
      role: Role.USER,
      status: AccountStatus.ACTIVE,
    });
  }

  // ADMIN / DELIVERY signup (pending approval)
  async createPendingStaff(
    name: string,
    email: string,
    password: string,
    role: Role.ADMIN | Role.DELIVERY,
  ): Promise<UserDocument> {
    const hashed = await bcrypt.hash(password, 10);

    return this.userModel.create({
      name,
      email,
      password: hashed,
      role,
      status: AccountStatus.PENDING,
    });
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findWithPassword(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).select('+password').exec();
  }
}
