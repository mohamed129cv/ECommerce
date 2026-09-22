import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { mainUrlUser } from '../../url/mainurl';
import { AlertService } from '../alert.service';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private alert: AlertService , private router : Router) {
    const auth = getAuth()
    onAuthStateChanged(auth , (user)=>{
      this.isLogin.next(!!user)
      this.setLoginState(!!user)
    })
   }

  isLogin = new BehaviorSubject<boolean>(
    JSON.parse(localStorage.getItem('login-ecom') || 'false')
  )
  $isLogin = this.isLogin.asObservable()

  setLoginState(stutes: boolean) {
    this.isLogin.next(stutes)
    localStorage.setItem('login-ecom', JSON.stringify(stutes))
  }
  checkAuth() {
    if (!this.isLogin.value) {
      this.alert.add_alert(
        'warning',
        'Please login first',
        'warning',
        3000
      );
      this.router.navigate(['/auth/login'] , {queryParams : {
        returnUrl : this.router.url
      }})
      return false;
    }
    return true
  }

  // rejster(body: any): Observable<any> {
  //   return this.http.post(`${mainUrlUser}/add`, body)
  // }

}
