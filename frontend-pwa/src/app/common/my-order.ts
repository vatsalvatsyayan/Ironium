import { OrderItem } from "./order-item";

export class MyOrder {
    constructor(public id: string,
        public orderTrackingNumber: string,
        public totalPrice: number,
        public totalQuantity: number,
        public dateCreated: Date,
        public status: string,
        public orderItems: OrderItem[]){
}
}
