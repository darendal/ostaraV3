import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Product} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  static GET_PRODUCTS: string = environment.functionsEndpoint + 'getProducts';
  static GET_PRODUCT_BY_ID: string = environment.functionsEndpoint + 'getProductById';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(ProductService.GET_PRODUCTS, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
  }

  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`${ProductService.GET_PRODUCT_BY_ID}?id=${productId}`, {
      headers: {
        'Content-Type': 'application/json'
      },
    });

  }
}
