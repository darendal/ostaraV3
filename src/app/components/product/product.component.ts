import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product';
import {Observable} from 'rxjs';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productObservable: Observable<Product>;

  private productId: string;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.productObservable = this.productService.getProductById(this.productId);
  }

}
