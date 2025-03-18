import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toasterService = inject(ToastrService);

  return next(req).pipe(catchError(err => {
    if (err) {
      switch (err.status) {
        case 400:
          if (err.error.errors) {
            const modelStateErrors = [];
            for (const key in err.error.errors) {
              if (err.error.errors[key]) {
                modelStateErrors.push(err.error.errors[key]);
              }
            }
            throw modelStateErrors.flat();
          } else {
            toasterService.error(err.error);
          }
          break;
        case 401:
          toasterService.error("Unathorized", err.status);
          break;
        case 404:
          router.navigateByUrl('/not-found');
          break;
        case 500:
          const navigationExtras:NavigationExtras = {state: err.error};
          router.navigateByUrl('/server-error', navigationExtras)
          break;
        default:
          toasterService.error('Something unexpected went wrong');
          break;
      }
    }
    throw err;
  }));
};
