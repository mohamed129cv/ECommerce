import { Routes } from '@angular/router';
import { productResolver } from './core/resolver/product.resolver';
import { userPageGuard } from './core/gurdes/user-page.guard';

export const routes: Routes = [
  {path: '' , redirectTo : 'page' , pathMatch : 'full'} ,
  {path :'page' ,  loadComponent : () => import('./layout/layout.component').then( c => c.LayoutComponent) , children : [
    {path : '' , redirectTo : 'home' , pathMatch : 'full'} ,
    {path : 'home' , loadComponent : () => import('./produt_page/home/home.component').then( c => c.HomeComponent) } ,
    {path : 'product' , loadComponent : ()=> import('./produt_page/prodcut/prodcut.component').then(c => c.ProdcutComponent)} ,
    {path : 'product/:id' , resolve: {data : productResolver}, loadComponent : ()=> import('./produt_page/prodcut-detalis/prodcut-detalis.component').then(c => c.ProdcutDetalisComponent)} ,
    {path : 'cart' ,  canActivate: [userPageGuard], loadComponent : () => import('./produt_page/cart/cart.component').then(c => c.CartComponent)} ,
    {path : 'favorite' ,canActivate: [userPageGuard],  loadComponent : () => import('./produt_page/favorit/favorit.component').then(c => c.FavoritComponent)} ,
    {path : '**' , loadComponent : () => import('./general/not-found/not-found.component').then(c => c.NotFoundComponent)}

  ] } ,
  {path : 'auth' , loadComponent : ()=>(import('./auth/auth-layaout/auth-layaout.component').then(c=>c.AuthLayaoutComponent)) , children : [

    {path : 'auth' , redirectTo : 'login' , pathMatch : 'full' } ,
    {path : 'login' , loadComponent : () => import('./auth/login/login.component').then(c => c.LoginComponent)} ,
    {path : 'register' , loadComponent : () => import('./auth/register/register.component').then(c => c.RegisterComponent)} ,
    {path : '**' , loadComponent : () => import('./general/not-found/not-found.component').then(c => c.NotFoundComponent)}
  ] } ,
  {path : 'user' , canActivate: [userPageGuard],  loadComponent: ()=>(import('./user/user-layout/user-layout.component').then(c=>c.UserLayoutComponent)) , children : [
    {path : 'user' ,  redirectTo : 'dasborde' , pathMatch:'full'} ,
    // {path : 'dasborde'  , loadComponent: ()=> (import('./user/dashboard/dashboard.component')).then(c=>c.DashboardComponent)} ,
    {path : 'profile' , loadComponent: ()=> (import('./user/account/account.component')).then(c=>c.AccountComponent)} ,
    {path:'setting' , loadComponent: ()=> (import('./user/setting/setting.component')).then(c=>c.SettingComponent)} ,
  ] },
  {path : '**' , loadComponent : () => import('./general/not-found/not-found.component').then(c => c.NotFoundComponent)}
];
