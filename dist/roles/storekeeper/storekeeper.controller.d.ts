import { Request } from 'express';
import { ProductsService } from '../../products/products.service';
import { OrdersService } from '../../orders/orders.service';
import { CreateProductDto } from '../../products/dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
export declare class StorekeeperController {
    private readonly productsService;
    private readonly ordersService;
    constructor(productsService: ProductsService, ordersService: OrdersService);
    createProduct(req: Request & {
        user: {
            userId: string;
        };
    }, dto: CreateProductDto): Promise<import("mongoose").Document<unknown, {}, import("../../products/product.schema").ProductDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../products/product.schema").Product & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getStoreProducts(req: Request & {
        user: {
            userId: string;
        };
    }): Promise<{
        _id: import("mongoose").Types.ObjectId;
        storeId: import("mongoose").Types.ObjectId;
        name: string;
        description?: string;
        images?: string[];
        quantity: number;
        price: number;
        category?: string;
        offers: {
            type: import("../../products/product.schema").DiscountType;
            value: number;
            isActive: boolean;
            startDate?: Date;
            endDate?: Date;
        }[];
    }[]>;
    getStoreProduct(req: Request & {
        user: {
            userId: string;
        };
    }, productId: string): Promise<import("mongoose").Document<unknown, {}, import("../../products/product.schema").ProductDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../products/product.schema").Product & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateProduct(req: Request & {
        user: {
            userId: string;
        };
    }, productId: string, dto: UpdateProductDto): Promise<import("mongoose").Document<unknown, {}, import("../../products/product.schema").ProductDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../products/product.schema").Product & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    deleteProduct(req: Request & {
        user: {
            userId: string;
        };
    }, productId: string): Promise<{
        message: string;
    }>;
    updateStock(req: Request & {
        user: {
            userId: string;
        };
    }, productId: string, dto: UpdateStockDto): Promise<import("mongoose").Document<unknown, {}, import("../../products/product.schema").ProductDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../products/product.schema").Product & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getStoreOrders(req: Request & {
        user: {
            userId: string;
        };
    }, status?: string): Promise<(import("mongoose").Document<unknown, {}, import("../../orders/order.schema").OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../orders/order.schema").Order & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getStoreOrder(req: Request & {
        user: {
            userId: string;
        };
    }, orderId: string): Promise<import("mongoose").Document<unknown, {}, import("../../orders/order.schema").OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../orders/order.schema").Order & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    acceptOrder(req: Request & {
        user: {
            userId: string;
        };
    }, orderId: string): Promise<import("mongoose").Document<unknown, {}, import("../../orders/order.schema").OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../orders/order.schema").Order & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    rejectOrder(req: Request & {
        user: {
            userId: string;
        };
    }, orderId: string): Promise<import("mongoose").Document<unknown, {}, import("../../orders/order.schema").OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../orders/order.schema").Order & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    markOrderReady(req: Request & {
        user: {
            userId: string;
        };
    }, orderId: string): Promise<import("mongoose").Document<unknown, {}, import("../../orders/order.schema").OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../orders/order.schema").Order & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getAvailableDeliveryBoys(req: Request & {
        user: {
            userId: string;
        };
    }, orderId: string): Promise<{
        orderId: string;
        availableDeliveryBoys: never[];
        message: string;
    }>;
}
