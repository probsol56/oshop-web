import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../services/products.service';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any = [];
  category: number;
  filteredProducts: any = [];

  constructor(private route: ActivatedRoute,
              private productService: ProductsService) {
    this.productService.getAll()
      .pipe(switchMap(res => {
        this.products = res;
        return this.route.queryParamMap;
      }))
      .subscribe(param => {
          this.category = +param.get('category');
          this.filteredProducts = this.category ?
            this.products.filter(p => p.cat === this.category) : this.products;
        });
      }

  ngOnInit() {


  }

}
