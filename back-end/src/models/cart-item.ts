import { Product } from "./product.js";

export class CartItem {
    constructor(public id: number, public quantity: number, public product: Product) { }
}