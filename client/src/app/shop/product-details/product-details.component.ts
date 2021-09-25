import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/models/product';
import { ShoppingCartService } from 'src/app/shopping-cart/shopping-cart.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  @Input() product?: IProduct;

  constructor(private shopService: ShopService, 
              private activateRoute: ActivatedRoute, 
              private bcService: BreadcrumbService, 
              private shoppingCartService: ShoppingCartService) { 
    this.bcService.set('@productDetails', '');
  }

  ngOnInit(): void {
    this.loadProduct();
  }
  addItemToShoppingCart(){
    this.shoppingCartService.addItemToShoppingCart(this.product);
  }
  loadProduct(){
    if (this.activateRoute.snapshot.paramMap.get('id') === undefined ) { return }
    else {
    this.shopService.getProduct(+this.activateRoute.snapshot.paramMap.get('id')).subscribe(product => {
      this.product = product;
      this.bcService.set('@productDetails', product.name);
      }, error => {
        console.log(error)
    });
    }
  }

}
