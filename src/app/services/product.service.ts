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

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(ProductService.GET_PRODUCTS, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
  }
}
