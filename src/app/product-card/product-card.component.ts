import {Component, Input} from '@angular/core';
import {ShoppingCartService} from '../services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product;
  @Input('show-actions') showActions = true;

  constructor(private cartService: ShoppingCartService) {
  }

   async addToCart(product) {
    await this.cartService.addToCart(product);
  }

}
