import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public content: CartItem [] = [];

  public addProduct(cartItem: CartItem) {
    this.content.push(cartItem);
  }

  public removeProduct(productId: number): void {
    this.content = this.content.filter(contentItem => {
      return contentItem.product.id !== productId;
    })
  }

  public isProductInCart(searchedProduct: Product): boolean{
    const foundProduct = this.content.find(contentItem => {
      return contentItem.product.id === searchedProduct.id;
    });
    return (foundProduct !== undefined);
  }

  public get itemsAmount(): number {
    return this.content.reduce((total, item) => total + item.quantity, 0);
  }
}
