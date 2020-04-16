import {Injectable} from '@angular/core';
import {ApiService} from '../api.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ShoppingCartService {

  cartExists: boolean;
  shoppingCart: any = [];

  constructor(private db: ApiService,
              private http: HttpClient) {
  }

  private create(product) {
    const cart = {
      amount: product.sell_price,
      cart_details: [{
        qty: 1,
        product: product.id,
        amount: product.sell_price
      }]
    };
    return this.http.post(this.db.baseURL + 'shopping-cart/', cart);
  }

  private getCart(cartId: number) {
    return this.http.get(this.db.baseURL + 'shopping-cart/' + cartId);
  }

  private getItem(cartId: number, productId: number) {
    return this.http.get(this.db.baseURL + 'cart-details/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(product) {
    this.cartExists = false;
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      this.cartExists = true;
      return cartId;
    }
    const result = this.create(product).subscribe(results => {
      localStorage.setItem('cartId', results['id']);
    });
    return result['id'];
  }

  private updateCart(cartId: number, product, items) {
    let totAmount;
    totAmount = items.amount;
    totAmount += product.sell_price;
    const cart = {
      amount: totAmount,
      cart_details: [
        {
          qty: 1,
          shopping_cart_id: cartId,
          product: product.id,
          amount: product.sell_price
        }
      ]
    };
    return this.http.put(this.db.baseURL + 'shopping-cart/' + cartId + '/', cart).subscribe();
  }

  async addToCart(product) {
    const cartId = await this.getOrCreateCartId(product);
    if (this.cartExists) {
      await this.getCart(cartId)
        .subscribe(res => {
          this.shoppingCart = res;
          this.updateCart(cartId, product, this.shoppingCart);
        });
    }
  }
}
