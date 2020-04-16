import {Injectable} from '@angular/core';
import {ApiService} from '../api.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ProductsService {

  constructor(private db: ApiService,
              private http: HttpClient) {

  }

  create(product) {
    return this.http.post(this.db.baseURL + 'products/', product);
  }

  getAll() {
    return this.http.get(this.db.baseURL + 'products');
  }

  getProductById(productId) {
    return this.http.get(this.db.baseURL + 'products/' + productId);
  }

  update(productId, product) {
    return this.http.put(this.db.baseURL + 'products/' + productId + '/', product);
  }
}
