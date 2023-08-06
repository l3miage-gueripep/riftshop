import { Product } from "./product.js";
import { Type } from "class-transformer";


export class CartItem {
    @Type(() => Product)
    public product: Product;
    constructor(public id: number, public quantity: number, product: Product) { 
        this.product = product;
    }

    public get interface(): any {
        console.log(this.product);
        console.log(this.product.interface);
        return {
            product: this.product.interface,
            quantity: this.quantity
        };
    }
}