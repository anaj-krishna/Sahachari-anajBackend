/* eslint-disable prettier/prettier */
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
 async createUser(data: {
  name: string;
  email: string;
  password: string;
  role: Role;
  status: AccountStatus;
  address: string;
  serviceablePincodes: string[];
}): Promise<UserDocument> {
  const hashed = await bcrypt.hash(data.password, 10);

  return this.userModel.create({
    ...data,
    password: hashed,
  });
}


  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findWithPassword(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).select('+password').exec();
  }
  // GET USER PROFILE
  async getById(userId: string) {
    return this.userModel.findById(userId).select('-password').exec();
  }

  // UPDATE PROFILE
  async updateProfile(userId: string, body: Partial<User>) {
    return this.userModel
      .findByIdAndUpdate(userId, body, { new: true })
      .select('-password')
      .exec();
  }
}
