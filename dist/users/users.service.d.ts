import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { Role } from '../common/enums/role.enum';
import { AccountStatus } from '../common/enums/account-status.enum';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    createUser(data: {
        name: string;
        email: string;
        password: string;
        role: Role;
        status: AccountStatus;
        address: string;
        serviceablePincodes: string[];
    }): Promise<UserDocument>;
    findByEmail(email: string): Promise<UserDocument | null>;
    findWithPassword(email: string): Promise<UserDocument | null>;
    getById(userId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    updateProfile(userId: string, body: Partial<User>): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
}
