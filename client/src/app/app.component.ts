import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart/shopping-cart.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Vehicles.com';

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    const shoppingCartId = localStorage.getItem('shoppingCart_id');
    if (shoppingCartId) {
      this.shoppingCartService.getShoppingCart(shoppingCartId).subscribe(() => {
        console.log('initialised shoppingCart');
      }, error => {
        console.log(error);
      });
    }
  }
}
