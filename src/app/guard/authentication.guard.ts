import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { BCConstants } from '../constants/bc.constants';

@Injectable()
export class AuthenticationGuard implements CanActivate {

    private can = false;

    constructor(private apiService: ApiService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot) {
        if (this.apiService.getAuthData()) {
            return true;
        } else {
            const _userData = localStorage.getItem(BCConstants.USER_DATA);

            if (typeof _userData !== 'undefined' && _userData) {
                const userData = JSON.parse(_userData);
                this.apiService.setAuthData(userData, false);
                return true;

            } else {
                this.router.navigate(['login']);
                return false;
            }
        }
    }
    setCanActivate (can) {
        this.can = can;
    }
}
// sample: http://plnkr.co/edit/sRNxfXsbcWnPU818aZsu?p=preview
