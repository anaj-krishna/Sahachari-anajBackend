import { DiscountType } from '../product.schema';
export declare class AddOfferDto {
    type: DiscountType;
    value: number;
    startDate?: string;
    endDate?: string;
}
