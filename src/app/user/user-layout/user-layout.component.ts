import { Route, Router } from '@angular/router';
import { CartService } from './../../core/apis/product/cart.service';
import { AuthService } from './../../core/apis/auth/auth.service';
import { Component } from '@angular/core';
import { NavbarComponent } from "../../general/navbar/navbar.component";
import { FooterComponent } from "../../general/footer/footer.component";
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { getAuth, signOut } from 'firebase/auth';
import { AlertService } from '../../core/apis/alert.service';
import { FavouriteService } from '../../core/apis/product/favourite.service';
import { FirebaseErrors } from '../../core/url/erores';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterOutlet, CommonModule, RouterLink , RouterLinkActive],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent {
  showBar : boolean = false
  constructor(private alert : AlertService , private AuthService :  AuthService  , private CartService : CartService , private FavouriteService: FavouriteService , private Router : Router ){}
  logout(){
    let auth = getAuth()
    let user = getAuth().currentUser
    if(!user) return
    signOut(auth).then(res=>{

      this.AuthService.setLoginState(false)
      this.CartService.cartItems.next([])
      this.FavouriteService.favoritCart.next([])
      this.Router.navigate(['/page/home'])
      this.alert.add_alert('success' , 'success Oprtion' , 'success' , 3000)
    }).catch(err => {
          let msg = FirebaseErrors[err.code] || 'Something went wrong'
          this.alert.add_alert('error', msg, 'Warring', 3000)
        })

  }

}
