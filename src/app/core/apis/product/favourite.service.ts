import { Injectable } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { Ifavorite } from '../../interface/ifavorite';
import { AlertService } from '../alert.service';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  constructor(private alert: AlertService) { }
  favoritCart = new BehaviorSubject<Ifavorite[]>([])
  async lodaFavorit() {
    let user = getAuth().currentUser
    if (!user) return
    let db = getFirestore()
    let favRef = doc(db, 'favorites', user.uid)
    let favDoc = await getDoc(favRef)
    if (favDoc.exists()) {
      this.favoritCart.next(favDoc.data()['items'] || [])
      return
    }
    this.favoritCart.next([])
  }
  async addFavorite(productId: number, productTitle: string, productImage: string) {
    let user = getAuth().currentUser
    if (!user) return
    let db = getFirestore()
    let favRef = doc(db, 'favorites', user.uid)
    let favDoc = await getDoc(favRef)
    if (!favDoc.exists()) {
      let items = [{ id: productId, title: productTitle, Image: productImage }]
      await setDoc(favRef, {
        items
      })
      this.favoritCart.next(items)
      return
    }
    let items = favDoc.data()['items'] || []
    let exiteng = items.find((i: any) => i.id == productId)

    if (exiteng) {
      items = items.filter((i: any) => i.id !== productId)
      this.favoritCart.next(items)
      await updateDoc(favRef, { items })
      this.alert.add_alert(
        'warning',
        'Removed from the favorites list.',
        '',
        3000
      );
      return
    }
    items.push({ id: productId, title: productTitle, Image: productImage })
    await updateDoc(favRef, { items })
    this.favoritCart.next(items)
    this.alert.add_alert(
      'success',
      'added to the favorites list.',
      'success',
      3000
    );
  }

  isFavorite(productId: number): boolean {
    return this.favoritCart.value.some(
      (i: any) => i.id === productId
    );
  }
  async clearAllFavourite() {
    let user = getAuth().currentUser
    if (!user) return
    let db = getFirestore()
    let cartRef = doc(db, 'favorites', user.uid)
    let alert = window.confirm('Are you sure you want to remove this products ?')
    if (!alert) return
    await updateDoc(cartRef, { items: [] })
    this.favoritCart.next([])
  }
  async removeFavourite(id: number) {
    let user = getAuth().currentUser
    if (!user) return
    let db = getFirestore()
    let favRef = doc(db, 'favorites', user.uid)
    let alert = window.confirm('Are you sure you want to remove this product ?')
    if (!alert) return
    let items = this.favoritCart.value.filter(f => f.id !== id)
    this.favoritCart.next(items)
    await updateDoc(favRef, { items })
  }
}
