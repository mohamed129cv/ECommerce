import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { getAuth } from 'firebase/auth';
import {
  doc,
  getDoc,
  getFirestore,
  updateDoc
} from 'firebase/firestore';

import { AlertService } from '../../core/apis/alert.service';
import { Iuser } from '../../core/interface/iuser';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent implements OnInit {

  userData!: Iuser;

  isLoading = false;
  isSaving = false;

  settingForm = new FormGroup({

    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),

    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),

    email: new FormControl({
      value: '',
      disabled: true
    }),

    phone: new FormControl('', [
      Validators.required
    ]),

    address: new FormControl('', [
      Validators.required
    ]),

    city: new FormControl('', [
      Validators.required
    ]),

    Country: new FormControl('', [
      Validators.required
    ])

  });


  constructor(
    private alertService: AlertService
  ) {}


  ngOnInit(): void {
    this.getUserData();
  }


  async getUserData() {

    const user = getAuth().currentUser;

    if (!user) {
      return;
    }

    this.isLoading = true;

    try {

      const db = getFirestore();

      const userRef = doc(
        db,
        'users',
        user.uid
      );

      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        return;
      }

      const data = userSnap.data() as Iuser;

      this.userData = data;

      this.settingForm.patchValue({

        firstName: data.firstName || '',

        lastName: data.lastName || '',

        email: data.email || user.email || '',

        phone: data.phone || '',

        address: data.address || '',

        city: data.city || '',

        Country: data.Country || ''

      });

    } catch (error) {

      console.log(error);

    } finally {

      this.isLoading = false;

    }

  }


  async updateUserData() {

    if (this.settingForm.invalid) {

      this.settingForm.markAllAsTouched();

      return;

    }

    const user = getAuth().currentUser;

    if (!user) {
      return;
    }

    this.isSaving = true;

    try {

      const db = getFirestore();

      const userRef = doc(
        db,
        'users',
        user.uid
      );

      const data = this.settingForm.getRawValue();

      await updateDoc(userRef, {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        address: data.address,
        city: data.city,
        Country: data.Country

      });

      this.alertService.add_alert(
        'main',
        'Your information has been updated successfully',
        'success',
        3000
      );

      // تحديث البيانات المحلية
      this.userData = {
        ...this.userData,
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        phone: data.phone || '',
        address: data.address || '',
        city: data.city || '',
        Country: data.Country || ''
      };

    } catch (error) {

      console.log(error);

      this.alertService.add_alert(
        'main',
        'Something went wrong',
        'error',
        3000
      );

    } finally {

      this.isSaving = false;

    }

  }

}
