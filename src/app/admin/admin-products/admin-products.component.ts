import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: any = [];
  filterProducts: any = [];
  subscription: Subscription;

  constructor(private productService: ProductsService) {
  }

  ngOnInit() {
    this.productService.getAll()
      .subscribe(res => {
        this.filterProducts = this.products = res;
      });
  }

  filter(query: string) {
    this.filterProducts = query ?
      this.products.filter(p => p.product_name.toLowerCase().includes(query.toLowerCase())) :
      this.products;

  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }

  }

}
