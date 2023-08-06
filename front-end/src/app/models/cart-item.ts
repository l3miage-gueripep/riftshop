import { Type } from "class-transformer";
import { Product } from "./product";
import 'reflect-metadata';

export class CartItem {
  @Type(() => Product)
  public product: Product;

  
  constructor(product: Product, public quantity: number){
    this.product = product;
  }
    
  public get frenchTotalPrice(): string {
    const totalPrice = (this.product.price * this.quantity).toFixed(2);
    return "€ " + totalPrice.replace(".", ",");
  }

  public get interface(): any {
    return {
      product: this.product.interface,
      quantity: this.quantity
    };
  }
}
