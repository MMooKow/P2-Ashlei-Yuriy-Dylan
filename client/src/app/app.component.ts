import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IPagination } from './shared/models/pagination';
import { IProduct } from './shared/models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Vehicles.com';
  products: IProduct[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('https://localhost:44329/api/products?pageSize=10').subscribe(
    (response: any) => {
      this.products = response.data;
    }, error => {
      console.log(error);
    });
  }
}
