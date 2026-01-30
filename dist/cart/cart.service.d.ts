import { Model, Types } from 'mongoose';
import { Cart, CartDocument } from './cart.schema';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { ProductsService } from '../products/products.service';
export declare class CartService {
    private readonly cartModel;
    private readonly productsService;
    constructor(cartModel: Model<CartDocument>, productsService: ProductsService);
    getCart(userId: string): Promise<(import("mongoose").Document<unknown, {}, CartDocument, {}, import("mongoose").DefaultSchemaOptions> & Cart & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | {
        userId: string;
        items: never[];
    }>;
    addToCart(userId: string, dto: AddToCartDto): Promise<import("mongoose").Document<unknown, {}, CartDocument, {}, import("mongoose").DefaultSchemaOptions> & Cart & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    removeItem(userId: string, itemId: string): Promise<import("mongoose").Document<unknown, {}, CartDocument, {}, import("mongoose").DefaultSchemaOptions> & Cart & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    clearCart(userId: string): Promise<void>;
}
