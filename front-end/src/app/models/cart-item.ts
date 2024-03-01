import { Type, plainToClass } from "class-transformer";
import { Product } from "./product";
import 'reflect-metadata';
import { DocumentSnapshot } from "firebase/firestore";

export class CartItem {
  @Type(() => Product)
  public product: Product;

  
  constructor(product: Product, public quantity: number, public id?: string){
    this.product = product;
  }
    
  public get frenchTotalPrice(): string {
    const totalPrice = (this.product.price * this.quantity).toFixed(2);
    return "€ " + totalPrice.replace(".", ",");
  }

  public static get firebaseConverter(): any {
    return {
      toFirestore: (cartItem: CartItem) => {
        return cartItem.interface;
      },
      fromFirestore: (snapshot: DocumentSnapshot) => {
        const data = snapshot.data();
        if (!data) {
          return null;
        }
        return plainToClass(CartItem, data);
      }
    }
  }

  public get interface(): any {
    return {
      ...(this.id ? { id: this.id } : {}),
      product: this.product.interface,
      quantity: this.quantity
    };
  }
}
