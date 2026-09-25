import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CategoryService } from '../../core/apis/product/category.service';
import { ICategory } from '../../core/interface/icategory';
import { IProduct } from '../../core/interface/iproduct';
import { ProductService } from '../../core/apis/product/product.service';
import { ProdcutCartComponent } from '../prodcut-cart/prodcut-cart.component';
import { FadeUpDirective } from '../../core/directive/fade-up.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ProdcutCartComponent, FadeUpDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private cate : CategoryService , private _ProductService:ProductService){}
  ngOnInit(): void {
    this.getCate()
    this.getprodcut()
  }
  heroItem : {
    num : string ,
    dis : string
  }[] = [
    {num : '50K+' , dis : 'Products'} ,
    {num : '4.7' , dis : 'Avg Rating'} ,
    {num : '2M+' , dis : 'Customers'} ,
  ]

  heroAchievement :{
    icon : string , title : string , dis : string
  } []=[
    {icon : 'bus-side' , title : 'Free Shipping' , dis : 'On orders over $75'} ,
    {icon : 'shield' , title : 'Secure Payment' , dis : '256-bit SSL encryption'} ,
    {icon : 'arrows-rotate' , title : 'Easy Returns' , dis : '30-day return policy'} ,
    {icon : 'bolt' , title : 'Fast Delivery' , dis : '2-day express available'} ,
  ]
  allCategory : ICategory[] = [] as ICategory[]
  product:IProduct[] = [] as IProduct[]
  isLoding :boolean = false
  getCate(){
    this.cate.getCategory().subscribe(res=>{
      this.allCategory = res
    })
  }
  getprodcut(){
    this.isLoding = true
    this._ProductService.getproductByFilters({
      sortBy:'rating' ,
      order: 'desc' ,

    }).subscribe({
      next : (res) =>{
        this.product = res.products.slice(0 , 8)
        this.isLoding  = false
      }
    })
  }
 category = [
  { src: 'bags.jpg', dis: 'Women Bags', router_link: 'womens-bags' },
  { src: 'beutfil.jpg', dis: 'Beauty', router_link: 'beauty' },
  { src: 'electr.jpg', dis: 'Electronics', router_link: 'laptops' },
  { src: 'man.jpg', dis: 'Men Shirts', router_link: 'mens-shirts' },
  { src: 'women.jpg', dis: 'Women Dresses', router_link: 'womens-dresses' },
  { src: 'food.jpg', dis: 'Groceries', router_link: 'groceries' },
  { src: 'sport.jpg', dis: 'Sports', router_link: 'sports-accessories' },
  { src: 'home.avif', dis: 'Furniture', router_link: 'furniture' },
]
}
