import { Document, Types } from 'mongoose';
export type OrderDocument = Order & Document;
export declare class OrderItem {
    productId: Types.ObjectId;
    quantity: number;
    price: number;
}
export declare const OrderItemSchema: import("mongoose").Schema<OrderItem, import("mongoose").Model<OrderItem, any, any, any, (Document<unknown, any, OrderItem, any, import("mongoose").DefaultSchemaOptions> & OrderItem & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, OrderItem, any, import("mongoose").DefaultSchemaOptions> & OrderItem & {
    _id: Types.ObjectId;
} & {
    __v: number;
}), any, OrderItem>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, OrderItem, Document<unknown, {}, OrderItem, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<OrderItem & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    productId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, OrderItem, Document<unknown, {}, OrderItem, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<OrderItem & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    quantity?: import("mongoose").SchemaDefinitionProperty<number, OrderItem, Document<unknown, {}, OrderItem, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<OrderItem & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    price?: import("mongoose").SchemaDefinitionProperty<number, OrderItem, Document<unknown, {}, OrderItem, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<OrderItem & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, OrderItem>;
export declare class DeliveryAddress {
    street: string;
    city: string;
    zipCode: string;
    phone: string;
    notes?: string;
}
export declare class Order {
    userId: Types.ObjectId;
    storeId: Types.ObjectId;
    checkoutId: string;
    deliveryBoyId?: Types.ObjectId;
    items: OrderItem[];
    totalAmount: number;
    deliveryAddress: DeliveryAddress;
    status: 'PLACED' | 'ACCEPTED' | 'REJECTED' | 'READY' | 'PICKED_UP' | 'DELIVERED' | 'FAILED' | 'CANCELLED';
}
export declare const OrderSchema: import("mongoose").Schema<Order, import("mongoose").Model<Order, any, any, any, (Document<unknown, any, Order, any, import("mongoose").DefaultSchemaOptions> & Order & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, Order, any, import("mongoose").DefaultSchemaOptions> & Order & {
    _id: Types.ObjectId;
} & {
    __v: number;
}), any, Order>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Order, Document<unknown, {}, Order, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    userId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    storeId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    checkoutId?: import("mongoose").SchemaDefinitionProperty<string, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    deliveryBoyId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId | undefined, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    items?: import("mongoose").SchemaDefinitionProperty<OrderItem[], Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    totalAmount?: import("mongoose").SchemaDefinitionProperty<number, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    deliveryAddress?: import("mongoose").SchemaDefinitionProperty<DeliveryAddress, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<"REJECTED" | "PLACED" | "ACCEPTED" | "READY" | "PICKED_UP" | "DELIVERED" | "FAILED" | "CANCELLED", Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Order>;
