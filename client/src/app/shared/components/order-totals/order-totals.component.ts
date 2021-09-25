import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IShoppingCartTotals } from 'src/app/models/shoppingCart';
import { ShoppingCartService } from 'src/app/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.css']
})
export class OrderTotalsComponent implements OnInit {
  shoppingCartTotal$: Observable<IShoppingCartTotals>;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.shoppingCartTotal$ = this.shoppingCartService.shoppingCartTotals$;
  }

}
