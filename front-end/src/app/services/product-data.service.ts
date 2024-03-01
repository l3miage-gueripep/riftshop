import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { Product } from '../models/product';
import { plainToInstance } from 'class-transformer';
import { FirebaseDataService } from './firebase-data.service';
import { DocumentSnapshot } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  constructor(private firebaseDataService: FirebaseDataService) { }

  public getProducts(): Observable<Product[]>{
    return this.firebaseDataService.getCollectionFromFirebaseOrLocalStorage("products", Product.firebaseConverter, Product)
  }

  public getProduct(id: string): Observable<Product> {
    return this.firebaseDataService.getDocFromFirebaseOrLocalStorage("products", id, Product.firebaseConverter, Product);
  }
}
