import { Product } from './../product/product';
import { Component, OnInit, Injectable  } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { empty } from 'rxjs';
import {ConstantsService} from '../common/services/constants.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})



@Injectable()
export class ProductComponent implements OnInit {



  URL_PRODUCT_PATH: string;
  id: number;
  name = '';
  color = '';
  price: number;
  products: any [];
  message: string;
  product: Product;
  selectedProduct: Product;
  // PAGINATION VALUES
  howManyRows = 6;
  totalProducts: number;
  curentPage = 1;
  paginationLength = 0;
  orderByColumn = 'id';
  orderBy = 'asc';
  // PAGINATION VALUES

  constructor (private httpClient: HttpClient, private _constant: ConstantsService) {
    //this.URL_PRODUCT_PATH = this._constant.baseAppUrl;
  }

  ngOnInit() {
    this.URL_PRODUCT_PATH = 'http://fake_server/products';
    this.getProducts();
  }

  changeOrder(order) {
    this.orderBy = order;
    this.getProducts();
  }

  onChange(deviceValue) {
    this.howManyRows = deviceValue;
    this.getPagination(this.totalProducts, this.howManyRows);
    this.getProducts();
}

  getPagination(totalProducts, howManyRows) {
    this.paginationLength = Math.ceil(totalProducts / howManyRows);
  }

  getCurentPage(curentPage) {
   this.curentPage = curentPage;
   this.getProducts();
  }

  /**
   * Search products by name
   * @param event
   */
  onNameKeyUp(event: any) {
    this.name = event.target.value;
    this.getProducts();
  }

  /**
   * Search products by color
   * @param event
   */
  onColorKeyUp(event: any) {
    this.color = event.target.value;
    this.getProducts();
  }

  /**
   * Search products by price
   * @param event
   */
  onPriceKeyUp(event: any) {
    this.price = event.target.value;
    this.getProducts();
  }

  getProducts() {
    let urlRName = this.URL_PRODUCT_PATH
    + `?_page=${this.curentPage}`
    + `&_limit=${this.howManyRows}`
    + `&_order=${this.orderBy}`
    + `&_sort=${this.orderByColumn}`;

    if ( this.name !== '' ) {
      urlRName = urlRName + `&name=${this.name}`;
    }

    if ( this.color !== '') {
      urlRName = urlRName + `&color=${this.color}`;
    }

    if ( this.price != null) {
      urlRName = urlRName + `&price=${this.price}`;
    }

    this.httpClient.get(urlRName)
    .subscribe(
      (data: any []) => {
       if ( data.length ) {
          this.products = data;
          this.totalProducts = data.length;
       }
      }
    );
  }

  postProduct(name: string, color: string, price: number): void {
    this.httpClient.post(this.URL_PRODUCT_PATH,
    {
      name: name,
      color: color,
      price: price
    })
    .subscribe(
      (data: any) => {
        this.message = 'Επιτυχής Εισαγωγή Προϊόντος';
        this.products.push(data);   
      }
    );
  }

  editProduct(id: number, name: string, color: string, price: number): void {
    this.httpClient.put(this.URL_PRODUCT_PATH + `/${id}`,
    {
      name: name,
      color: color,
      price: price
    })
    .subscribe(
      (data: any) => {
       this.message = 'Επιτυχής Επεξεργασία Προϊόντος';
       this.getProducts();
      }
    );
  }

  deleteProduct(id: number ) {
    this.httpClient.delete(this.URL_PRODUCT_PATH + `/${id}`)
    .subscribe(
      (data: any) => {
        this.message = 'To προϊόν διεγάφει επιτυχώς';
        this.products.pop();  
      }
    );
  }

  onChangeOrderColumn(column: string) {
    this.orderByColumn = column;
    this.getProducts();
  }

  onSelectedProduct(product: Product) {
    this.selectedProduct = product;
  }

  onChangeOrder(orderBy: string) {
    this.orderBy = orderBy;
    this.getProducts();
  }


}
