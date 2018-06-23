import { Product } from './../product/product';
import { Component, OnInit, Injectable  } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { empty } from 'rxjs';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

@Injectable()
export class ProductComponent implements OnInit {
  id: number;
  name = '';
  color: string;
  price: number;
  found: boolean;
  data: any [];
  message: string;
  product: Product;
  selectedProduct: Product;
  // PAGINATION VALUES
  howManyRows = 2;
  totalProducts: number;
  curentPage = 1;
  paginationLength = 0;
  orderByColumn = 'id';
  orderBy = 'desc';
  // PAGINATION VALUES
  constructor (private httpClient: HttpClient) {
  }

  ngOnInit() {
    if ( this.color !== '') { this.getProducts(); }
    this.getProductsTotalProducts();
  }

  onChange(deviceValue) {
    this.howManyRows = deviceValue;
    this.getPagination(this.totalProducts, this.howManyRows);
    this.getProducts();
}

  getPagination(totalProducts, howManyRows) {
    this.paginationLength = Math.ceil(totalProducts / howManyRows);
    console.log(totalProducts + ' / ' + howManyRows );
    console.log(this.paginationLength);
  }

  getCurentPage(curentPage) {
   this.curentPage = curentPage;
   this.getProducts();
  }

  onNameKeyUp(event: any) {
    console.log( '-->' + event.target.value);
    this.name = event.target.value;
    this.found = false;
    if (this.name.length >= 3) {
      this.getProduct(event);
    }
  }

  getProductsTotalProducts() {
    this.httpClient.get(`http://localhost:555/products`)
    .subscribe(
      (data: any []) => {
       if ( data.length ) {
        this.totalProducts = data.length;
        console.log(data.length);
       }
      }
    );
  }

  getProducts() {
    this.
    httpClient.
    get(`http://localhost:555/products/?_page=${this.curentPage}&_limit=${this.howManyRows}&_order=${this.orderBy}&_sort=${this.orderByColumn}`)
    .subscribe(
      (data: any []) => {
       if ( data.length ) {
          this.data = data;
       }
      }
    );
  }

  getProduct(event) {

    let headers = new HttpHeaders();
    headers  = headers.append('header-1', 'value-1');
    headers  = headers.append('header-2', 'value-2');

    let params = new HttpParams();
    params = params.append('color', event.target.value);
    params = params.append('name', 'mike');

    this.httpClient.get(`http://localhost:555/products`,  {headers , params })
    .subscribe(
      (data: any []) => {
       if ( data.length ) {
          this.product = data[0];
          this.price = data[0].price;
          this.found = true;
          this.ngOnInit();
       }
      }
    );
  }

  postProduct(name: string, color: string, price: number): void {
    this.httpClient.post(`http://localhost:555/products/`,
    {
      name: name,
      color: color,
      price: price
    })
    .subscribe(
      (data: any) => {
       console.log(data);
       this.message = 'Επιτυχής Εισαγωγή Προϊόντος';
       this.ngOnInit();
      }
    );
  }

  editProduct(id: number, name: string, color: string, price: number): void {

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    let params = new HttpParams();
    params = params.append('name', name);
    params = params.append('color', color);

    this.httpClient.put(`http://localhost:555/products/${id}`,
    {
      name: name,
      color: color,
      price: price
    })
    .subscribe(
      (data: any) => {
       console.log(data);
       this.message = 'Επιτυχής Επεξεργασία Προϊόντος';
       this.ngOnInit();
      }
    );
  }
  senfValuesToModalProduct(product: Product) {

  }

  deleteProduct(id: number ) {
    this.httpClient.delete(`http://localhost:555/products/${id}`)
    .subscribe(
      (data: any) => {
        this.message = 'To προϊόν διεγάφει επιτυχώς';
        this.ngOnInit();
      }
    );
  }

  onChangeOrderColumn(column: string) {
    this.orderByColumn = column;
    console.log(column);
    this.ngOnInit();
  }

  onSelectedProduct(pr) {
    this.selectedProduct = pr;
  }

  onChangeOrder(orderBy) {
    console.log(orderBy);
    this.orderBy = orderBy;
    this.ngOnInit();
  }

}






