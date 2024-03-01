import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { CartItem } from '../models/cart-item';
import { plainToInstance } from 'class-transformer';
import { FirebaseDataService } from './firebase-data.service';
import { Observable } from 'rxjs';
import { DocumentData, DocumentReference } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public content: CartItem [] = [];

  constructor(private firebaseDataService: FirebaseDataService){
    this.loadContentFromFirebase();
  }

  public addItem(cartItem: CartItem) : Observable<DocumentReference<DocumentData>>{
    //if it already exists, increase the quantity
    this.content.push(cartItem);
    return this.firebaseDataService.addToCart(cartItem);
  }

  public updateCartItem(cartItem: CartItem): Observable<void>{
    return this.firebaseDataService.updateCartItem(cartItem);
  }

  public removeItem(itemId: string): Observable<void> {
    this.content = this.content.filter(contentItem => {
      return contentItem.id !== itemId;
    });
    return this.firebaseDataService.deleteCartItem(itemId);
  }

  public isProductInCart(searchedProduct: Product): boolean{
    const foundProduct = this.content.find(contentItem => {
      return contentItem.product.id === searchedProduct.id;
    });
    return (foundProduct !== undefined);
  }

  private refreshLocalStorageContent(): void{
    localStorage.setItem('cartContent', JSON.stringify(this.content))
  }


  // public saveInFirebase(): void{
  //   if(this.content.length === 0)
  //     return;
  //   this.firebaseDataService.setDocInFirebase('cart', this.content[0].interface);
  // }

  public get itemsAmount(): number {
    return this.content.reduce((total, item) => total + item.quantity, 0);
  }

  public get totalPrice(): string {
    return '€ ' + this.content.reduce((total, item) => total + (item.product.price * item.quantity), 0).toFixed(2);
  }

  public setProductQuantity(productId: string, quantity: number){
    const cartItem: CartItem | undefined = this.content.find(cartItem => cartItem.product.id === productId);
    if(cartItem){
      cartItem.quantity = quantity;
      this.refreshLocalStorageContent();
    }
  }

  public loadContentFromFirebase(): void {
    this.firebaseDataService.loadCart().subscribe(querySnapshot => {
      querySnapshot.forEach(doc => {
        const cartItem = doc.data() as CartItem;
        cartItem.id = doc.id;
        this.content.push(cartItem);
      });
    });
  }

  public clearCart(): void{
    this.content = [];
    this.refreshLocalStorageContent();
  }
}
