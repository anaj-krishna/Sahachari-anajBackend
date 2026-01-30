export declare enum OrderStatus {
    PLACED = "PLACED",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
    READY = "READY",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED"
}
export declare class UpdateOrderStatusDto {
    status: OrderStatus;
}
