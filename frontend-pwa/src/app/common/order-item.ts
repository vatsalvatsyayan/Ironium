import { BagItem } from "./bag-item";

export class OrderItem {
    imageUrl! : string;
    quantity! : number;
    unitPrice! : number;
    productId! : number;

    constructor(bagItem: BagItem)
    {
        this.imageUrl = bagItem.imageUrl;
        this.quantity = bagItem.quantity;
        this.unitPrice = bagItem.unitPrice;
        this.productId = bagItem.id;
    }
}
