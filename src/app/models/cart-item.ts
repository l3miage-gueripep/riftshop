import { Product } from "./product";

export class CartItem {
  constructor(public product: Product, public quantity: number){}
    
  public get frenchTotalPrice(): string {
    const totalPrice = this.product.price * this.quantity;
    return "€ " + totalPrice.toString().replace(".", ",");
  }
}
