import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromRoot from '../state/reducers';
import * as LogoutActions from '../state/dashboard.component-actions';

import { NavModel } from './nav.model';
import * as NavigationItems from './nav-item.list';
import { ApiService } from '../service/api.service';
import { BCConstants } from '../constants/bc.constants';

@Component({
    selector: 'app-bc-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: [
        './dashboard.component.css',
        '../../assets/styles/font-awesome.min.css'
    ]
})
export class DashboardComponent implements OnInit {
    userData;
    userName = '';
    selectedNavItem = 0;
    navItems: NavModel[] = NavigationItems.NAVIGATION_ITEMS;
    constructor(
        private store: Store<fromRoot.State>,
        private router: Router,
        private apiService: ApiService
    ) {}
    ngOnInit(): void {
        this.userData = this.apiService.getAuthData().user;
        this.userName = this.userData.name;

        if (this.userData) {
            this.initNavMenu();
        } else {
            this.router.navigate(['/login']);
        }
        console.log(this.router.url);
    }
    initNavMenu (): void {
        if (this.isAdminUser(this.userData.email)) {
            this.navItems = NavigationItems.NAVIGATION_ITEMS_ADMIN;
            this.selectedNavItem = 3;
            this.router.navigate(['/dashboard/admin-management']);
        }
    }
    isAdminUser (email: string): boolean {
        const ADMIN = ['arnel@coderepubliq.com', 'ryan@coderepubliq.com'];
        for (let i = 0; i < ADMIN.length; i++) {
            if (email.toLowerCase() === ADMIN[i]) {
                return true;
            }
        }
        return false;
    }
    onNavItemClick(position: number) {
        // don't let it redraw if the selected index is the same.
        if (this.selectedNavItem === position) {
            return;
        }

        this.selectedNavItem = position;
        switch (position) {
            case 0:
                this.router.navigate(['/dashboard']);
                break;
            case 1:
                this.router.navigate(['/dashboard/promo-management']);
                break;
            case 2:
                this.router.navigate(['/dashboard/promo-assignment']);
                break;
            case 3:
                this.router.navigate(['/dashboard/admin-management']);
                break;
            case 8:
                this.router.navigate(['/dashboard/import-list']);
                break;
            default:
                break;
        }
    }
    getSelectedNavItemByRoute (route: string) {
    }
    onLogout() {
        this.store.dispatch(new LogoutActions.Logout({logout: true}));
        localStorage.removeItem(BCConstants.USER_DATA);
        this.router.navigate(['login']);
        console.log('Loggin out...');
    }
}
