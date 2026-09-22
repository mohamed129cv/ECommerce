import { FavouriteService } from './../../core/apis/product/favourite.service';
import { AuthService } from './../../core/apis/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { getAuth, signOut } from 'firebase/auth';
import { AlertService } from '../../core/apis/alert.service';
import { FirebaseErrors } from '../../core/url/erores';
import { CartService } from '../../core/apis/product/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  enabaleSearch: boolean = false
  isLogin: boolean = false
  isShow: boolean = false
  constructor(private AuthService: AuthService , private FavouriteService :FavouriteService  ,private cartService : CartService , private alert: AlertService, private ele: ElementRef) { }

  ngOnInit(): void {
    this.AuthService.$isLogin.subscribe(res => {
      this.isLogin = res
    })
  }
  singOut() {
    let auth = getAuth()
    signOut(auth).then(res => {
      this.AuthService.setLoginState(false)
      this.cartService.cartItems.next([])
      this.FavouriteService.favoritCart.next([])
      this.alert.add_alert('main', 'Successful operation', 'Logged out', 3000)
    }).catch(err => {
      let msg = FirebaseErrors[err.code] || 'Something went wrong'
      this.alert.add_alert('main', msg, 'Warring', 3000)
    })
  }
  @HostListener('window:click', ['$event']) onDocumentClick(event: MouseEvent) {
    let clickInsid = this.ele.nativeElement.contains(event.target)
    if (!clickInsid) {
      this.isShow = false;
    }
  }
  clcQuantiy(){
   return this.cartService.clcQuantiy()
 }

}

