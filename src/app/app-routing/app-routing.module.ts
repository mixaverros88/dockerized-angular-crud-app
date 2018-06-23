import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsDetailsComponent } from './../products-details/products-details.component';
import { ProductComponent } from './../product/product.component';

const routes: Routes = [
  { path: 'products', component: ProductComponent,
    children: [
      { path: ':id', component: ProductsDetailsComponent }
    ]
  },
  { path: 'product', component: ProductsDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

export const routingComponents = [ProductComponent, ProductsDetailsComponent];
