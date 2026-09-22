import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AlertService } from '../apis/alert.service';

export const userPageGuard: CanActivateFn = (route, state) => {
  let auth = getAuth()
  let router = inject(Router);
  let alert = inject(AlertService);
  return new Promise<boolean | UrlTree>((resolve) => {

    const unsubscribe = onAuthStateChanged(auth, user => {

      unsubscribe();

      if (user) {

        // المستخدم عامل Login
        resolve(true);

      } else {
        alert.add_alert('warning','Please login first','Warning',3000);
        resolve(
          router.createUrlTree(['/auth/login'], {
            queryParams: { returnUrl: state.url }
          })
        );

      }

    });

  });

};
