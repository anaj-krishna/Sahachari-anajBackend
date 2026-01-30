import { Request } from 'express';
import { ProductsService } from '../../products/products.service';
import { CartService } from '../../cart/cart.service';
import { OrdersService } from '../../orders/orders.service';
import { AddToCartDto } from '../../cart/dto/add-to-cart.dto';
import { PlaceOrderDto } from '../../orders/dto/place-order.dto';
export declare class CustomerController {
    private readonly productsService;
    private readonly cartService;
    private readonly ordersService;
    constructor(productsService: ProductsService, cartService: CartService, ordersService: OrdersService);
    getProducts(search?: string, category?: string): Promise<{
        finalPrice: number;
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
    getProduct(id: string): Promise<{
        finalPrice: number;
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
    }>;
    getStores(): Promise<import("mongoose").Types.ObjectId[]>;
    getStoreProducts(storeId: string): Promise<{
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
    getCart(req: Request & {
        user: {
            userId: string;
        };
    }): Promise<(import("mongoose").Document<unknown, {}, import("../../cart/cart.schema").CartDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../cart/cart.schema").Cart & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | {
        userId: string;
        items: never[];
    }>;
    addToCart(req: Request & {
        user: {
            userId: string;
        };
    }, dto: AddToCartDto): Promise<import("mongoose").Document<unknown, {}, import("../../cart/cart.schema").CartDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../cart/cart.schema").Cart & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    removeCartItem(req: Request & {
        user: {
            userId: string;
        };
    }, itemId: string): Promise<import("mongoose").Document<unknown, {}, import("../../cart/cart.schema").CartDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../../cart/cart.schema").Cart & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    placeOrder(req: Request & {
        user: {
            userId: string;
        };
    }, dto: PlaceOrderDto): Promise<{
        checkoutId: string;
        ordersCount: number;
        totalAmount: number;
        orders: import("../../orders/order.schema").OrderDocument[];
    }>;
    getOrders(req: Request & {
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
    getOrder(req: Request & {
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
    cancelOrder(req: Request & {
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
}
