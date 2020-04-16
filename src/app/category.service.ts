import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CategoryService {

  constructor(private db: ApiService,
              private http: HttpClient) {
  }

  getAll() {
    return this.http.get(this.db.baseURL + 'categories');
  }

}
