import { AlertService } from './../../core/apis/alert.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterLink } from "@angular/router";
import { AuthService } from '../../core/apis/auth/auth.service';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { FirebaseErrors } from '../../core/url/erores';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private authService: AuthService, private AlertService: AlertService , private route : ActivatedRoute, private _router : Router) { }
  ngOnInit(): void {
    this.initFormControl()
    this.initFormGroup()
  }
  showPassword: boolean = false
  newUser !: FormGroup
  firstName!: FormControl
  lastName!: FormControl
  email!: FormControl
  password!: FormControl
  initFormControl() {
    this.firstName = new FormControl('', Validators.required)
    this.lastName = new FormControl('', Validators.required)
    this.email = new FormControl('', Validators.required)
    this.password = new FormControl('', Validators.required)
  }
  initFormGroup() {
    this.newUser = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
    })
  }
  createUser() {
    let auth = getAuth()

    createUserWithEmailAndPassword(auth, this.newUser.value.email, this.newUser.value.password)
      .then(async (user) => {
        let db = getFirestore()
        await setDoc(
          doc(db, 'users', user.user.uid), {
          firstName: this.newUser.value.firstName,
          lastName: this.newUser.value.lastName,
          email: this.newUser.value.email,
          role: 'user',
          createdAt: new Date()
        }
        )
        this.authService.setLoginState(true)
        this.AlertService.add_alert('main' ,`Created account ${this.newUser.value.firstName} ` , 'success' , 3000)
        let url = this.route.snapshot.queryParamMap.get('returnUrl')

        this._router.navigateByUrl(url ||'/page/home')

      })
      .catch(err => {
        let msg =     FirebaseErrors[err.code] ?? 'Unexpected event'
        this.AlertService.add_alert('main', msg, 'Erorr', 3000)

      })

  }


}
