import {RouterModule, Routes} from '@angular/router';
import {ShopShellComponent} from './components/shop-shell/shop-shell.component';
import {ShopComponent} from './components/shop/shop.component';
import {ProductComponent} from './components/product/product.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {path: '', redirectTo: '/shop', pathMatch: 'full'},
  {path: 'shop', component: ShopShellComponent, children: [
      {path: '', component: ShopComponent},
      {path: 'product/:id', component: ProductComponent}]
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
