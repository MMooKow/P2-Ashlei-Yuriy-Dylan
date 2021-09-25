import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IShoppingCart } from '../models/shoppingCart';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  shoppingCart$: Observable<IShoppingCart>;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.shoppingCart$ = this.shoppingCartService.shoppingCart$;
  }

}
