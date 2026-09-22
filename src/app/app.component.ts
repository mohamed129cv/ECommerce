import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertComponent } from "./core/alert/alert.component";
import { AlertService } from './core/apis/alert.service';
import { CartService } from './core/apis/product/cart.service';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FavouriteService } from './core/apis/product/favourite.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private alert: AlertService , private cartService : CartService , private  FavouriteService : FavouriteService ) { }
  title = 'E-Commerce';

  alert_type !: '' | 'success' | 'info' | 'error' | 'primary' | 'warning';
  alert_message !: string
  alert_title !: string
  alert_show: boolean = false;
  alert_time !: number;



  show_alert(type: '' | 'main' | 'success' | 'info' | 'error' | 'primary' | 'warning', t: string, msg: string, time: number = 1000) {
    this.alert.add_alert(type, msg, t, time)
  }
  ngOnInit(): void {
    onAuthStateChanged(getAuth() , user=>{
      if(user){
        this.cartService.lodaCart()
        this.FavouriteService.lodaFavorit()
      }
    })
  }

}
