import { CommonModule } from '@angular/common';
import { CartService } from '../../core/apis/product/cart.service';
import { Icart } from '../../core/interface/icart';
import { IProduct } from '../../core/interface/iproduct';
import { ProductService } from './../../core/apis/product/product.service';
import { Component } from '@angular/core';
import { FavouriteService } from '../../core/apis/product/favourite.service';
import { Ifavorite } from '../../core/interface/ifavorite';
import { RouterLink } from "@angular/router";
import { FadeUpDirective } from '../../core/directive/fade-up.directive';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, FadeUpDirective],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  constructor(private productService: ProductService, private cartService: CartService ) { }
  allProducts: IProduct[] = [] as IProduct[]
  cartProducts: IProduct[] = []
  items: Icart[] = []
  ngOnInit(): void {
    this.getAllproducts()
    this.items = this.cartService.cartItems.value
  }



  getQuantity(id: number): number {
    return this.cartService.getProductQuantity(id)
  }
  getAllproducts() {
    this.productService.getAllproject(400, 0).subscribe(res => {
      this.allProducts = res.products;
      this.initProduct()
    })
  }
  initProduct(){
    for (let i = 0; i < this.items.length; i++) {
      this.cartProducts.push(this.allProducts.find(p => p.id == this.items[i].productId) || {} as IProduct)
    }

  }
  clcALlPrice() {
    return this.cartProducts.reduce((total, item) => {
      let quantity = this.getQuantity(item.id)
      let discount = item.price - (item.price * item.discountPercentage / 100)
      return (total + (discount * quantity))
    }, 0)
  }
  clcQuantiy() {
    return this.cartService.clcQuantiy()
  }
  async clearCarts() {
    await this.cartService.clearCart()
    this.cartProducts = []
    this.clcALlPrice()
  }
  async removeCart(id: number) {
    await this.cartService.removeCart(id)
    this.cartProducts = this.cartProducts.filter(
      p => p.id !== id
    );

    this.clcALlPrice()
  }
  async decrease(id:number) {
    await this.cartService.decreaseQuantity(id)
    this.clcALlPrice()
  }
  async increase(id:number) {
    await this.cartService.increaseQuantity(id)
    this.clcALlPrice()
  }
}
