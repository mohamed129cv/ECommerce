import { CommonModule } from '@angular/common';
import { FavouriteService } from './../../core/apis/product/favourite.service';
import { Component } from '@angular/core';
import { Ifavorite } from '../../core/interface/ifavorite';
import { RouterLink } from "@angular/router";
import { FadeUpDirective } from '../../core/directive/fade-up.directive';

@Component({
  selector: 'app-favorit',
  standalone: true,
  imports: [CommonModule, RouterLink, FadeUpDirective],
  templateUrl: './favorit.component.html',
  styleUrl: './favorit.component.css'
})
export class FavoritComponent {
   products :Ifavorite[] = [] as Ifavorite[]
   constructor(private  FavouriteService : FavouriteService){}

  ngOnInit(): void {
    this.FavouriteService.favoritCart.subscribe(res => this.products = res)
  }
  clearFavorivte(){
    this.FavouriteService.clearAllFavourite()
  }
  removeFavorivte(id: number){
    this.FavouriteService.removeFavourite(id)
  }
  }
