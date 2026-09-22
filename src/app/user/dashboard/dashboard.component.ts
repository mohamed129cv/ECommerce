import { Component } from '@angular/core';
import { Iuser } from '../../core/interface/iuser';
import { getAuth } from 'firebase/auth';
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, updateDoc } from 'firebase/firestore';
import { AlertService } from '../../core/apis/alert.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private alert: AlertService) { }
  async ngOnInit() {
    await this.getUsers()
  }

  allUsers!: Iuser[];
  users: Iuser[ ] = [] as Iuser[];
  isLoading: boolean = false;
  async getUsers() {
    this.isLoading = false;
    let auth = getAuth()
    if (!auth.currentUser) return
    console.time('getUsers');
    let db = getFirestore()
    let userRef = collection(db, 'users')
    let sanpShot = await getDocs(userRef)
    console.timeEnd('getUsers');
    this.isLoading = true;
    const data = sanpShot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    this.allUsers = data as Iuser[]
    this.users = [...this.allUsers]
  }
  async updateUserRole(user: Iuser, role: 'admin' | 'user') {
    let userAcount = getAuth().currentUser
    if (!userAcount) return
    if (userAcount?.uid === user.id) {
      this.alert.add_alert('error', 'You cannot change your own role', 'Error', 3000)
      return
    }

    let db = getFirestore()
    let userRef = doc(db, 'users', user.id || '')
    await updateDoc(userRef, { role: role })
    this.alert.add_alert('success', `${user.firstName} ${user.lastName}  was appointed as an official`, 'success', 3000)
  }

  search(key: string) {

    const searchKey = key.trim().toLowerCase();
    if (!searchKey) {
      this.users = [...this.allUsers]
      return
    }

     this.users= this.allUsers.filter(user =>
      user.email?.toLowerCase().includes(searchKey) ||
      user.firstName?.toLowerCase().includes(searchKey) ||
      user.lastName?.toLowerCase().includes(searchKey) ||
      user.phone?.toLowerCase().includes(searchKey) ||
      user.id?.toLowerCase().includes(searchKey)
    );

  }
  pageRow = 10
  currentPage = 1

  displayPage() {
    let start = (this.currentPage - 1) * this.pageRow
    let end = this.pageRow + start

    let newArr = this.users.slice(start,end)
    return newArr
  }
  changePageRow(num: number) {
    this.pageRow = num
    this.currentPage = 1
    this.displayPage()
  }
  totelPage(){
    return Math.ceil(this.users.length / this.pageRow)
  }
  nextPage() {
    if(this.currentPage >= this.totelPage() ){
      this.alert.add_alert('warning' , 'You are already on the last page' ,'waring' , 3000)
      return
    }
    this.currentPage += 1

    this.displayPage()
  }
  prePage() {
    if(this.currentPage ==1 ) {
      this.currentPage = 1
      this.alert.add_alert('warning' , 'You are already on the first page' ,'waring' , 3000)
    return
    }
    this.currentPage -= 1
    this.displayPage()
  }
  get adminCount() {
  return this.allUsers.filter(user => user.role === 'admin').length;
}

get userCount() {
  return this.allUsers.filter(user => user.role === 'user').length;
}

get recentUsers() {
  return this.allUsers.length;
}
}
