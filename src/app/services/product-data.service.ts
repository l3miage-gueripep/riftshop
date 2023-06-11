import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  constructor(private http: HttpClient) { }

  getData(): Observable<Product[]> {
    return this.http.get<any>('assets/mock-data.json').pipe(
      map(response => response.products as Product[]),
      map(products => products.map(product => new Product(product.id, product.name, product.price, product.description, product.image)))
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.getData().pipe(
      map(products => products.find(product => product.id == id) as Product)
    );
  }
}
