import { Injectable } from '@angular/core';
import { DocumentData, DocumentReference } from 'firebase/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';
import { FirebaseDataService } from './firebase-data.service';
import { FirebaseLoginService } from './firebase-login.service';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public content: CartItem [] = [];

  public loaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private firebaseDataService: FirebaseDataService, private firebaseLoginService: FirebaseLoginService, private generalService: GeneralService) {
    if(this.firebaseLoginService.user){
      this.loadContentFromFirebase();
    }
  }

  public addItem(cartItem: CartItem) : Observable<DocumentReference<DocumentData>>{
    if(this.isProductInCart(cartItem.product)){
      throw new Error('Product already in cart');
    }
    this.content.push(cartItem);
    return this.firebaseDataService.addToCart(cartItem);
  }

  public updateCartItem(cartItem: CartItem): Observable<void>{
    return this.firebaseDataService.updateCartItem(cartItem);
  }

  public removeItem(productId: string): Observable<void> {
    let itemId: string | undefined;
    this.content = this.content.filter(contentItem => {
      const isItemToRemove = contentItem.product.id === productId;
      if(isItemToRemove){
        itemId = contentItem.id;
      }
      return !isItemToRemove;
    });
    if(itemId === undefined){
      throw new Error('Product not in cart');
    }
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
    this.generalService.enableLoading();
    
    this.firebaseDataService.loadCart().subscribe(querySnapshot => {
      querySnapshot.forEach(doc => {
        const cartItem = doc.data() as CartItem;
        cartItem.id = doc.id;
        this.content.push(cartItem);
      });
      this.generalService.disableLoading();
      this.loaded$.next(true);
    });
  }

  public clearCart(): void{
    this.content = [];
    this.refreshLocalStorageContent();
  }
}
