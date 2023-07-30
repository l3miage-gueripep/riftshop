import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { CartItem } from '../models/cart-item';
import { plainToInstance } from 'class-transformer';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public content: CartItem [] = [];

  constructor(){
    this.loadLocalStorageContent();
  }

  public addProduct(cartItem: CartItem) {
    this.content.push(cartItem);
    this.setLocalStorageContent();
  }

  public removeProduct(productId: string): void {
    this.content = this.content.filter(contentItem => {
      return contentItem.product.id !== productId;
    });
    this.setLocalStorageContent();
  }

  public isProductInCart(searchedProduct: Product): boolean{
    const foundProduct = this.content.find(contentItem => {
      return contentItem.product.id === searchedProduct.id;
    });
    return (foundProduct !== undefined);
  }

  private loadLocalStorageContent(): void{
    const storedContent = localStorage.getItem('cartContent');
    if(storedContent){
      //using class-transformer to get instances instead of literal objects
      this.content = plainToInstance(CartItem, JSON.parse(storedContent));
    }    
  }

  private setLocalStorageContent(): void{
    localStorage.setItem('cartContent', JSON.stringify(this.content))
  }

  public get itemsAmount(): number {
    return this.content.reduce((total, item) => total + item.quantity, 0);
  }

  public setProductQuantity(productId: string, quantity: number){
    const cartItem: CartItem | undefined = this.content.find(cartItem => cartItem.product.id === productId);
    if(cartItem){
      cartItem.quantity = quantity;
      this.setLocalStorageContent();
    }
  }
}
