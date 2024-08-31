import { Injectable, inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivateFn,
    Router,
    RouterStateSnapshot,
} from '@angular/router';

@Injectable({
    providedIn: 'root',
})
class PermissionsService {
    constructor(private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const isAuthenticated = !!localStorage.getItem('access_token');
        const targetUrl = state.url;

        if (isAuthenticated) {
            if (targetUrl === '/login') {
                this.router.navigate(['/suppliers']);
                return false;
            }

            return true;
        } else {
            if (targetUrl !== '/login') {
                this.router.navigate(['/login']);
                return false;
            }

            return true;
        }
    }
}

export const AuthGuard: CanActivateFn = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
): boolean => {
    return inject(PermissionsService).canActivate(next, state);
};
