import { AuthService } from './../../core/apis/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { AlertService } from '../../core/apis/alert.service';
import { FirebaseErrors } from '../../core/url/erores';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { CartService } from '../../core/apis/product/cart.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private alert: AlertService, private authService: AuthService , private router: Router, private route : ActivatedRoute , private cartService : CartService) {

  }
  ngOnInit(): void {
    this.initFormControl()
    this.initFormGroup()
  }
  showPassword: boolean = false

  login !: FormGroup
  email!: FormControl
  password !: FormControl

  initFormControl() {
    this.email = new FormControl('', Validators.required)
    this.password = new FormControl('', Validators.required)
  }
  initFormGroup() {
    this.login = new FormGroup({
      email: this.email,
      password: this.password
    })
  }
  submitLogin() {
    let auth = getAuth()
    let email = this.login.value.email
    let password = this.login.value.password
    signInWithEmailAndPassword(auth, email, password).then(async (res) => {
      let db = getFirestore()
      let user = await getDoc(doc(db , 'users' , res.user.uid))
      let userData =  user.data()
      this.authService.setLoginState(true)
      this.alert.add_alert('main', `Welcome back ${userData?.['firstName']} !`, 'Successful operation', 3000)
      await this.cartService.lodaCart()
      let url = this.route.snapshot.queryParamMap.get('returnUrl')
      this.router.navigateByUrl(url || 'page/home')
    })
      .catch(err => {
        let msg: string = FirebaseErrors[err.code] ?? 'Unexpected event'
        this.alert.add_alert('main', msg, 'Erorr', 3000)
      })
  }

}
