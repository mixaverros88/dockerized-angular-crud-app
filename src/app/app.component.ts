import { Product } from './product/product';
import { Component, OnInit, Injectable  } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { empty } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent implements OnInit{
  id: number;
  name:string ='';
  color:string;
  price: number;
  found: boolean;
  data:any [];
  message: string;
  product: Product;

  constructor (private httpClient: HttpClient) {
  }

  ngOnInit() {
    console.log('This is in the OnInit lifecycle hook');
    if(this.color !=''){
      this.getProducts();
    }
  }

  onNameKeyUp(event: any) {
    console.log("-->" + event.target.value);
    this.name = event.target.value;
    this.found = false;
    if(this.name.length >= 3) {
      this.getProduct(event);
    }
  }

  getProducts() {


    this.httpClient.get(`http://localhost:555/products/`)
    .subscribe(
      (data: any []) => {
       if( data.length ) {
          this.data = data;
         console.log(data);
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
    // this.httpClient.get(`http://localhost:555/products/?color=${this.name}`)
    .subscribe(
      (data: any []) => {
       if( data.length ) {
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

  updateProduct(product: Product) {
    this.httpClient.put(`http://localhost:555/products/`, product)
    .subscribe(
      (data: any) => {
        this.message = 'To προϊόν επεξεργάστικε επιτυχώς';
        this.ngOnInit();
      }
    )
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


}
