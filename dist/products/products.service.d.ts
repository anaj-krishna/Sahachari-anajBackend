import { Model, Types } from 'mongoose';
import { Product, ProductDocument, DiscountType } from './product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { AddOfferDto } from './dto/add-offer.dto';
type LeanOffer = {
    type: DiscountType;
    value: number;
    isActive: boolean;
    startDate?: Date;
    endDate?: Date;
};
type LeanProduct = {
    _id: Types.ObjectId;
    storeId: Types.ObjectId;
    name: string;
    description?: string;
    images?: string[];
    quantity: number;
    price: string;
    category?: string;
    offers: LeanOffer[];
};
export declare class ProductsService {
    private readonly productModel;
    constructor(productModel: Model<ProductDocument>);
    create(storeId: string, dto: CreateProductDto): Promise<import("mongoose").Document<unknown, {}, ProductDocument, {}, import("mongoose").DefaultSchemaOptions> & Product & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getStoreProductById(storeId: string, productId: string): Promise<import("mongoose").Document<unknown, {}, ProductDocument, {}, import("mongoose").DefaultSchemaOptions> & Product & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateProduct(storeId: string, productId: string, dto: any): Promise<import("mongoose").Document<unknown, {}, ProductDocument, {}, import("mongoose").DefaultSchemaOptions> & Product & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    deleteProduct(storeId: string, productId: string): Promise<{
        message: string;
    }>;
    updateStock(storeId: string, productId: string, quantity: number): Promise<import("mongoose").Document<unknown, {}, ProductDocument, {}, import("mongoose").DefaultSchemaOptions> & Product & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    addOffer(productId: string, dto: AddOfferDto): Promise<import("mongoose").Document<unknown, {}, ProductDocument, {}, import("mongoose").DefaultSchemaOptions> & Product & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findById(id: string): Promise<{
        finalPrice: number;
        _id: Types.ObjectId;
        storeId: Types.ObjectId;
        name: string;
        description?: string;
        images?: string[];
        quantity: number;
        price: string;
        category?: string;
        offers: LeanOffer[];
    }>;
    findAll(filters?: {
        search?: string;
        category?: string;
    }): Promise<{
        finalPrice: number;
        _id: Types.ObjectId;
        storeId: Types.ObjectId;
        name: string;
        description?: string;
        images?: string[];
        quantity: number;
        price: string;
        category?: string;
        offers: LeanOffer[];
    }[]>;
    getStores(): Promise<Types.ObjectId[]>;
    getProductsByStore(storeId: string): Promise<LeanProduct[]>;
    private toNumberPrice;
    private calculateFinalPrice;
}
export {};
