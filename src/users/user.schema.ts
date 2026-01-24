import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Role } from '../common/enums/role.enum';
import { AccountStatus } from '../common/enums/account-status.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ enum: Role, required: true })
  role: Role;

  @Prop({ required: true })
  address: string;

  @Prop({ type: [String], required: true })
  serviceablePincodes: string[];

  @Prop({
    enum: AccountStatus,
    default: AccountStatus.PENDING,
  })
  status: AccountStatus;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Store', required: false })
  storeId?: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);

//JOB OF THE users FOLDER - only this
// WHO is this person?
// How do they login?
// What role do they have?
