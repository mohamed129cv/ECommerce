import { FavouriteService } from './../../core/apis/product/favourite.service';
import { AlertService } from './../../core/apis/alert.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IProduct } from '../../core/interface/iproduct';
import { AuthService } from '../../core/apis/auth/auth.service';
import { getAuth } from 'firebase/auth';
import { addDoc, doc, getDoc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { CartService } from '../../core/apis/product/cart.service';

@Component({
  selector: 'app-prodcut-detalis',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterLink],
  templateUrl: './prodcut-detalis.component.html',
  styleUrl: './prodcut-detalis.component.css'
})
export class ProdcutDetalisComponent {
  constructor(private _activatedRoute: ActivatedRoute, private router: Router, private authService: AuthService, private AlertService: AlertService, private cartService: CartService, private FavouriteService: FavouriteService) { }
  product: IProduct = {} as IProduct
  endType: 'dis' | 'reviwe' = 'dis'
  islogin: boolean = false
  isFavorite: boolean = false
  count: number = 1
  imgSrc: string = ''

  ngOnInit(): void {
    this._activatedRoute.data.subscribe(async res => {
      this.product = res['data']
      this.imgSrc = this.product.thumbnail
      this.isFavoriteProduct()
    })
    this.authService.$isLogin.subscribe(res => this.islogin = res)
  }

  get inCart(): boolean {
    return this.cartService.inCart(this.product.id)
  }

  initStar(rate: number): string[] {
    let stars: string[] = []
    for (let i = 0; i <= 4; i++) {
      if (rate >= i + 1) {
        stars.push('full');
      }
      else if (rate >= i + 0.5) {
        stars.push('half');
      }
      else {
        stars.push('empty');
      }

    }
    return stars

  }
  //! add to cart
  async addToCart() {
    if (!this.authService.checkAuth()) return
    try {
      await this.cartService.addToCart(this.product.id, this.count)
      this.AlertService.add_alert(
        'main',
        'Product added to cart',
        'success',
        3000
      );

    } catch (err) {

      this.AlertService.add_alert(
        'main',
        'Something went wrong',
        'error',
        3000
      );

    }

  }

  increaseQuantity() {
    if (this.product.stock > this.count) {
      this.count++
    } else {
      this.AlertService.add_alert(
        'warning',
        'No other quantity available',
        'warring',
        3000
      );
    }
  }

  decreaseQuantity() {
    if (this.count > 1) {
      this.count--
    } else {
      this.AlertService.add_alert(
        'warning',
        'Reached the minimum',
        'warring',
        3000
      );
    }

  }
  async addToFavourite() {
    if (!this.authService.checkAuth()) return
    try {
      await this.FavouriteService.addFavorite(this.product.id, this.product.title, this.product.thumbnail)
      this.isFavoriteProduct()
      
    } catch (err) {
      this.AlertService.add_alert(
        'error',
        'Something went wrong',
        'error',
        3000
      );
    }
  }
  isFavoriteProduct() {
    this.isFavorite = this.FavouriteService.isFavorite(this.product.id)
  }

}
