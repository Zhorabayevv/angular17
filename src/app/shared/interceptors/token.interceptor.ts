import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { AlertService } from '../services/alert.service';
import { LoginService } from 'src/app/pages/login/services/login.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
    const _alertService = inject(AlertService);
    const _loginService = inject(LoginService);

    const token = localStorage.getItem('token') ?? '';

    req = req.clone({
        setHeaders: {
            Authorization: token ? `Bearer ${token}` : '',
        },
    });

    return next(req).pipe(
        catchError((err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    _alertService.error('Unauthorized request', 'Please log in to continue');
                    _loginService.logout();
                    console.error('Unauthorized request:', err);
                } else {
                    console.error('HTTP error:', err);
                }
            } else {
                console.error('An error occurred:', err);
            }

            return throwError(() => err);
        }),
    );
};
