import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './Components/all-products/all-products.component';
import { ViewProductsComponent } from './Components/view-products/view-products.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { CartComponent } from './Components/cart/cart.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '', component: AllProductsComponent
  },
  {
    path: 'view/:id', component: ViewProductsComponent
  },
  {
    path: 'user/login', component: LoginComponent
  },
  {
    path: 'user/register', component: RegisterComponent
  },
  {
    path: 'user/cart', component: CartComponent
  },
  {
    path: 'user/wishlist', component: WishlistComponent
  },
  {
    path: '**', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
