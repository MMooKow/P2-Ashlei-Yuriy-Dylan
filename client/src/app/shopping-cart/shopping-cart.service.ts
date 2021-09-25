import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IProduct } from '../models/product';
import { IShoppingCart, IShoppingCartItem, IShoppingCartTotals, ShoppingCart } from '../models/shoppingCart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  baseUrl = environment.apiUrl;
  private shoppingCartSource = new BehaviorSubject<IShoppingCart>(null);
  shoppingCart$ = this.shoppingCartSource.asObservable();
  private shoppingCartTotalSource = new BehaviorSubject<IShoppingCartTotals>(null);
  shoppingCartTotals$ = this.shoppingCartTotalSource.asObservable();

  constructor(private http: HttpClient) {} 
    getShoppingCart(id: string){
      return this.http.get(this.baseUrl + 'shoppingCart?id=' + id)
        .pipe(
          map((shoppingCart: IShoppingCart) => {
            this.shoppingCartSource.next(shoppingCart);
            this.calculateTotals();
          })
        );
  }
  setShoppingCart(shoppingCart: IShoppingCart) {
    return this.http.post(this.baseUrl + 'shoppingCart', shoppingCart).subscribe((response: IShoppingCart) => {
      this.shoppingCartSource.next(response); 
      this.calculateTotals();
    }, error => {
        console.log(error);
    });
  }
  getCurrentShoppingCartValue() {
    return this.shoppingCartSource.value;
  }
  addItemToShoppingCart(item: IProduct, quantity = 1) {
    const itemToAdd: IShoppingCartItem = this.mapProductItemToShoppingCartItem(item, quantity);
    const shoppingCart = this.getCurrentShoppingCartValue() ?? this.createShoppingCart();
    shoppingCart.items = this.addOrUpdateItem(shoppingCart.items, itemToAdd, quantity);
    this.setShoppingCart(shoppingCart);
  }
  private calculateTotals(){
    const shoppingCart = this.getCurrentShoppingCartValue();
    const delivery = 750;
    const subtotal = shoppingCart.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
    const tax = (subtotal + delivery) * 0.06;
    const total = subtotal + delivery + tax;
    this.shoppingCartTotalSource.next({delivery, subtotal, tax, total})
  }
  private addOrUpdateItem(items: IShoppingCartItem[], itemToAdd: IShoppingCartItem, quantity: number): IShoppingCartItem[] {
    const index = items.findIndex(i => i.id === itemToAdd.id);
    if (index === -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    } else {
      items[index].quantity += quantity;
    }
    return items;
  }
  /// will store cart on local machine of the user. local storadge is specific to a browser
  private createShoppingCart(): IShoppingCart {
    const shoppingCart = new ShoppingCart();
    localStorage.setItem('shoppingCart_id', shoppingCart.id);
    return shoppingCart;
  }
  private mapProductItemToShoppingCartItem(item: IProduct, quantity: number): IShoppingCartItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity,
      brand: item.productBrand,
      type: item.productType
    }
  }
}
