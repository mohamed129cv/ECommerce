import { AlertService } from './../alert.service';
import { Injectable } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Icart } from '../../interface/icart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private authService: AuthService ,private AlertService :AlertService) { }
  cartItems = new BehaviorSubject<Icart[]>([])

  async lodaCart() {
    let user = getAuth().currentUser
    if (!user) return
    let db = getFirestore()
    let cartSanp = await getDoc(doc(db, 'carts', user.uid || '0'))
    if (!cartSanp.exists()) {
      this.cartItems.next([])
      return
    }
    this.cartItems.next(
      cartSanp.data()['items'] || []
    )
  }

  getProductQuantity(id :number){
    let item : Icart = this.cartItems.value.find(i => i.productId == id) || {} as Icart
    return item.quantity || 1
  }
  inCart(id: number) {
    return this.cartItems.value.some((res: any) => res.productId === id)
  }

  async addToCart(productId: number , count : number = 1) {
    let user = getAuth().currentUser
    if (!user) return
    let db = getFirestore()
    let cartRf = doc(db, 'carts', user.uid || '0')
    let cartSpan = await getDoc(cartRf)
    if (!cartSpan.exists()) {
      const items = [
        {
          productId: productId, quantity:count
        }
      ]
      await setDoc(cartRf, { items })
      this.cartItems.next(items)
      return
    }
    let items = cartSpan.data()['items'] || []
    let isFound: Icart = items.find((i: Icart) => i.productId === productId)

    if (isFound) {
      isFound.quantity++

    } else {
      items.push({
        productId, quantity: count
      })
    }
    await updateDoc(cartRf , {items})
    this.cartItems.next([...items])
  }

  async increaseQuantity(id : number){
    let user = getAuth().currentUser
    if(!user) return
    let items = [...this.cartItems.value]
    let item : Icart  = items.find(i => i.productId == id) || {} as Icart
    if(!item) return
    item.quantity ++
    let db = getFirestore()
    await updateDoc(doc(db , 'carts' , user.uid ) , {items})
    this.cartItems.next(items)
  }
  async decreaseQuantity(id : number){
    let user = getAuth().currentUser
    if(!user) return
    let items = [...this.cartItems.value]
    let item : Icart  = items.find(i => i.productId == id) || {} as Icart
    if(!item) return
    if(item.quantity > 0){
          item.quantity --
    }
    let db = getFirestore()
    await updateDoc(doc(db , 'carts' , user.uid ) , {items})
    this.cartItems.next(items)
  }
  async removeCart(id :number){
    let user = getAuth().currentUser
    if(!user ) return
    let db = getFirestore()
    let cartRef = doc(db , 'carts' , user.uid )
    if(!window.confirm('Are you sure you want to remove this product ?')) return
    let items = this.cartItems.value.filter(i => i.productId != id)
    this.AlertService.add_alert(
      'success',
      'Product removed from cart',
      'success',
      3000
    );
  await  updateDoc(cartRef , {items})
    this.cartItems.next(items)

  }
 async clearCart(){
    let user = getAuth().currentUser
    if(!user ) return
    let db = getFirestore()
    let cartRef =  doc(db , 'carts' , user.uid )
    if(!window.confirm('Are you sure you want to remove this products ?')) return
    this.AlertService.add_alert(
      'success',
      'All products removed from cart','success' ,3000)
    await updateDoc(cartRef , {items: [] })

   this.cartItems.next([])
  }
   clcQuantiy(){
    return this.cartItems.value.reduce((total , item)=>{
      return total + item.quantity
    }, 0)
  }

}
