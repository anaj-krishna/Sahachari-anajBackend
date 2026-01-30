import { Request } from 'express';
import { OrdersService } from '../../orders/orders.service';
export declare class DeliveryController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    getOrders(req: Request & {
        user: {
            userId: string;
        };
    }, status?: string, mine?: string): Promise<(import("mongoose").Document<unknown, {}, import("../../orders/order.schema").OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../orders/order.schema").Order & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    myJobs(req: Request & {
        user: {
            userId: string;
        };
    }): Promise<(import("mongoose").Document<unknown, {}, import("../../orders/order.schema").OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../orders/order.schema").Order & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getOrder(orderId: string, req: Request & {
        user: {
            userId: string;
        };
    }): Promise<import("mongoose").Document<unknown, {}, import("../../orders/order.schema").OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../orders/order.schema").Order & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    accept(orderId: string, req: Request & {
        user: {
            userId: string;
        };
    }): Promise<import("mongoose").Document<unknown, {}, import("../../orders/order.schema").OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../orders/order.schema").Order & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    pickup(orderId: string, req: Request & {
        user: {
            userId: string;
        };
    }): Promise<import("mongoose").Document<unknown, {}, import("../../orders/order.schema").OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../orders/order.schema").Order & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    deliver(orderId: string, req: Request & {
        user: {
            userId: string;
        };
    }): Promise<import("mongoose").Document<unknown, {}, import("../../orders/order.schema").OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../orders/order.schema").Order & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    fail(orderId: string, req: Request & {
        user: {
            userId: string;
        };
    }): Promise<import("mongoose").Document<unknown, {}, import("../../orders/order.schema").OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../orders/order.schema").Order & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
