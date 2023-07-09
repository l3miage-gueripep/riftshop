import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private content: { product: Product, quantity: number } [] = [];

  public addProduct(product: Product, quantity: number) {
    //increment the quantity of the product if it already exists in the cart
    const existingCartItem = this.content.find(item => item.product.id === product.id);
    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      this.content.push({ product, quantity });
    }
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
