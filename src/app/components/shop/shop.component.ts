import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Observable} from 'rxjs';
import {Product} from '../../models/product';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor(private productService: ProductService) { }

  products: Observable<Product[]>;

  ngOnInit(): void {
    this.products = this.productService.getAllProducts();
  }

}
