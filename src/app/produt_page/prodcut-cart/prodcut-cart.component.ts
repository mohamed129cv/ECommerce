import { CommonModule } from '@angular/common';
import { IProduct } from '../../core/interface/iproduct';
import { ProductService } from './../../core/apis/product/product.service';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../core/apis/auth/auth.service';
import { FavouriteService } from '../../core/apis/product/favourite.service';
import { Ifavorite } from '../../core/interface/ifavorite';
import { FadeUpDirective } from "../../core/directive/fade-up.directive";

@Component({
  selector: 'app-prodcut-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, FadeUpDirective],
  templateUrl: './prodcut-cart.component.html',
  styleUrl: './prodcut-cart.component.css'
})
export class ProdcutCartComponent {
  constructor(private _productService: ProductService, private authService: AuthService , private router : Router , private favouriteService : FavouriteService ) { }
  islogin: boolean = false
  favouritProduct : Ifavorite [] = [] as Ifavorite[]
 @Input({required:true}) allProduct: IProduct[] = [] as IProduct[]
  @Input({required:true}) isLoding: boolean = false
  ngOnInit(): void {
    this.authService.$isLogin.subscribe(res => this.islogin = res)
  }
   getFavourteProduct(){
    this.favouriteService.favoritCart.subscribe(res => this.favouritProduct = res)
  }
  isFavourite(id:number): boolean{
  return  this.favouriteService.isFavorite(id)
  }

//! heart
  addToFavorate(id:number , title: string , img : string){
    this.favouriteService.addFavorite(id , title , img)
    console.log('object');
  }
}
