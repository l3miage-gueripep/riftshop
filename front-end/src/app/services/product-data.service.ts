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
    const productsString = sessionStorage.getItem("products");
    if(productsString){
      console.log("Products found in session storage");
      return from([plainToInstance(Product, JSON.parse(productsString) as Product[])]);
    }
    return this.firebaseDataService.getCollection("products", Product.firebaseConverter).pipe(
      map(querySnapshot =>{
        const products = querySnapshot.docs.map(doc =>{
          const product = doc.data() as Product;
          return product;
        });
        sessionStorage.setItem("products", JSON.stringify(products)); 
        return products;
      })
    );
  }

  public getProductById(id: string): Observable<Product> {
    const productString = sessionStorage.getItem(id);
    if(productString){
      console.log("Product found in session storage");
      return from([plainToInstance(Product, JSON.parse(productString) as Product)]);
    }
    return this.firebaseDataService.getDoc("products", id, Product.firebaseConverter).pipe(
      map(doc =>{
        const product = doc.data() as Product;
        sessionStorage.setItem(id, JSON.stringify(product));
        return product;
      })
    );
  }
}
