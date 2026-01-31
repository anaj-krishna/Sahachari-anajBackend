import { HydratedDocument, Types } from 'mongoose';
import { Role } from '../common/enums/role.enum';
import { AccountStatus } from '../common/enums/account-status.enum';
export type UserDocument = HydratedDocument<User>;
export declare class User {
    name: string;
    email: string;
    password: string;
    role: Role;
    address: string;
    serviceablePincodes: string[];
    status: AccountStatus;
    isVerified: boolean;
    storeId?: Types.ObjectId;
    address2?: string;
    mobileNumber?: string;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, (import("mongoose").Document<unknown, any, User, any, import("mongoose").DefaultSchemaOptions> & User & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (import("mongoose").Document<unknown, any, User, any, import("mongoose").DefaultSchemaOptions> & User & {
    _id: Types.ObjectId;
} & {
    __v: number;
}), any, User>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, import("mongoose").Document<unknown, {}, User, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<User & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, User, import("mongoose").Document<unknown, {}, User, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<User & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    email?: import("mongoose").SchemaDefinitionProperty<string, User, import("mongoose").Document<unknown, {}, User, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<User & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    password?: import("mongoose").SchemaDefinitionProperty<string, User, import("mongoose").Document<unknown, {}, User, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<User & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    role?: import("mongoose").SchemaDefinitionProperty<Role, User, import("mongoose").Document<unknown, {}, User, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<User & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    address?: import("mongoose").SchemaDefinitionProperty<string, User, import("mongoose").Document<unknown, {}, User, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<User & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    serviceablePincodes?: import("mongoose").SchemaDefinitionProperty<string[], User, import("mongoose").Document<unknown, {}, User, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<User & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<AccountStatus, User, import("mongoose").Document<unknown, {}, User, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<User & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isVerified?: import("mongoose").SchemaDefinitionProperty<boolean, User, import("mongoose").Document<unknown, {}, User, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<User & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    storeId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId | undefined, User, import("mongoose").Document<unknown, {}, User, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<User & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    address2?: import("mongoose").SchemaDefinitionProperty<string | undefined, User, import("mongoose").Document<unknown, {}, User, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<User & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    mobileNumber?: import("mongoose").SchemaDefinitionProperty<string | undefined, User, import("mongoose").Document<unknown, {}, User, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<User & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, User>;
