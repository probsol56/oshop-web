import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../category.service';
import {ProductsService} from '../../services/products.service';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories: any = [];
  product: any = [];
  message: string;
  fileData: File = null;
  imgURL: any = null;
  id;

  constructor(private categoryService: CategoryService,
              private productService: ProductsService,
              private router: Router,
              private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.categoryService.getAll()
      .subscribe(res => this.categories = res);
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.getProductById(this.id)
        .pipe(take(1))
        .subscribe(p => {
          this.product = p;
          this.imgURL = this.product.image_url;
        });
    }
  }

  save(product) {
    if (product.active) {
      product.active = 1;
    } else {
      product.active = 0;
    }
    product.image_url = this.imgURL;
    if (this.id) {
      product.image_url = this.imgURL;
      this.productService.update(this.id, product)
        .subscribe();
    } else {
      this.productService.create(product)
        .subscribe();
    }
    this.router.navigate(['/admin/products']);
  }

  previewImage(event) {
    this.message = '';
    this.imgURL = '';
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (_event: any) => {
        this.imgURL = _event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

}
