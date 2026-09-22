import { AuthService } from './../../core/apis/auth/auth.service';
import { FavouriteService } from './../../core/apis/product/favourite.service';
import { Component } from '@angular/core';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { Iuser } from '../../core/interface/iuser';
import { DatePipe } from '@angular/common';
import { Icart } from '../../core/interface/icart';
import { Ifavorite } from '../../core/interface/ifavorite';
import { Router, RouterLink } from "@angular/router";
import { FirebaseErrors } from '../../core/url/erores';
import { AlertService } from '../../core/apis/alert.service';
import { CartService } from '../../core/apis/product/cart.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  constructor( private router : Router, private alert: AlertService , private FavouriteService :FavouriteService , private cartService : CartService , private AuthService :AuthService ) { }
  ngOnInit(): void {
    let auth = getAuth()
    onAuthStateChanged(auth, u => {
      if (u) {
        this.getUserData('users')
        this.getUserData('carts')
        this.getUserData('favorites')
      }
    })
  }
  userData !: Iuser
  cart !: any
  favourite !: any

  async getUserData(path: string) {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert('لا يوجد مستخدم مسجل');
      return;
    }

    const db = getFirestore();

    const docRef = doc(db, path, user.uid);

    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      if (path == 'users') {
        this.userData = {
          lastName: '',
          firstName: '',
          email: '',
          createAt: new Date()
        }
      }
      if (path == 'favorites') {
        this.favourite = []
      }
      if (path == 'carts') {
        this.cart = []
      }
      return
    }
    switch (path) {
      case 'users': {
        this.userData = docSnap.data() as Iuser
        break
      }
      case 'favorites': {
        this.favourite = docSnap.data() as Ifavorite[]
        break
      }
      case 'carts': {
        this.cart = docSnap.data() as Icart[]
        break
      }
    }

  }

    singOut() {
      let auth = getAuth()
      signOut(auth).then(res => {
        this.AuthService.setLoginState(false)
        this.cartService.cartItems.next([])
        this.FavouriteService.favoritCart.next([])
        this.router.navigate(['/auth/login'])
        this.alert.add_alert('success', 'Successful operation', 'Logged out', 3000)
      }).catch(err => {
        let msg = FirebaseErrors[err.code] || 'Something went wrong'
        this.alert.add_alert('error', msg, 'Warring', 3000)
      })
    }
}
