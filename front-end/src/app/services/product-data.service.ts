import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { NotFoundException } from 'src/app/models/errors/not-found-exception';
import { Product } from '../models/product';
import { FirebaseDataService } from './firebase-data.service';


@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  constructor(private firebaseDataService: FirebaseDataService) { }

  public getProducts(): Observable<Product[]>{
    return this.firebaseDataService.getCollectionFromFirebaseOrLocalStorage("products", Product.firebaseConverter, Product)
  }

  public getProduct(id: string): Observable<Product> {
    return this.firebaseDataService.getDocFromFirebaseOrLocalStorage("products", id, Product.firebaseConverter, Product).pipe(
      map((product: Product) => {
        if (!product) {
          throw new NotFoundException();
        }
        return product;
      })
    );
  }
}
