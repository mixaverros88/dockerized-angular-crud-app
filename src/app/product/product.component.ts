import { Product } from '../common/models/product';
import { Component, Injectable  } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {ConstantsService} from '../common/services/constants.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})

@Injectable()
export class ProductComponent {

  URL_PRODUCT_PATH: string;
  id: number;
  name = '';
  color = '';
  price: number;
  products: any [];
  jsonUrl: any;
  message: string;
  title = 'Search';
  selectedProduct: Product;
  // PAGINATION VALUES
  howManyRows = 6;
  totalProducts: number;
  currentPage = 1;
  paginationLength = 0;
  orderByColumn = 'id';
  orderBy = 'asc';

  constructor (
    private httpClient: HttpClient,
    private _constant: ConstantsService) {
    this._constant.getJSON().subscribe(
      (data) => {
        this.jsonUrl = data;
        this.URL_PRODUCT_PATH =  this.jsonUrl.url ;
        console.log(this.URL_PRODUCT_PATH);
        this.URL_PRODUCT_PATH = 'http://localhost:3000/products';
        console.log(this.URL_PRODUCT_PATH);
        this.getProducts();
      }
    );
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

  getCurrentPage(currentPage) {
   this.currentPage = currentPage;
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
    + `?_page=${this.currentPage}`
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

      (response: any) => {
        this.message = 'Επιτυχής Εισαγωγή Προϊόντος';
        const id = response.id;
        const pro: Product = { id, name, color, price };
        this.products.splice(0, 0, pro);
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
      (response: any) => {
        console.log(response);
       this.message = 'Επιτυχής Επεξεργασία Προϊόντος';
       this.getProducts();
      }, error => {
        alert('error');
      }
    );
  }

  deleteProduct(product: Product ) {
    this.httpClient.delete(this.URL_PRODUCT_PATH + `/${product.id}`)
    .subscribe(
      (response: Response) => {
        const index = this.products.indexOf(product);
        console.log(index);
        this.products.slice(index, 1);
        console.log(this.products);
      },  (error: Response) => {
        console.log(error.status);
        alert('error');
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

  sizeOfPanginatio(): number {
    let size: number;
    if ( this.howManyRows < this.products.length) {
      size = this.products.length / this.howManyRows;
    }
    return size;
  }
}
