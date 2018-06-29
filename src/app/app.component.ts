import { Component, OnInit, trigger, transition, animate, style } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

// guards
import { AuthenticationGuard } from './guard/authentication.guard';

import { LoginModel } from './login/LoginModel';

import { Store } from '@ngrx/store';
import * as LoginActions from './state/login.component-actions';
import * as DashboardActions from './state/dashboard.component-actions';
import * as fromRoot from './state/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('1500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('1500ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ]
})
export class AppComponent implements OnInit {
  loginData: Observable<LoginModel>;
  logoutState: Observable<boolean>;

  title = 'Beep Card';

  hasLoggedIn = false;
  constructor(
    private store: Store<fromRoot.State>,
    private router: Router,
    private authenticationGuard: AuthenticationGuard
  ) {
    this.loginData = store.select(fromRoot.getLoginData);
    this.logoutState = store.select(fromRoot.getLogoutState);

    this.loginData.subscribe((result) => {
      console.log(result);

      if (result.loginSuccess) {
        this.hasLoggedIn = true;

        // this.authenticationGuard.setCanActivate(this.hasLoggedIn);

        this.router.navigate(['./dashboard']);
      } else {
      }
    });

    this.logoutState.subscribe((result) => {
      if (result) {
        this.hasLoggedIn = false;

        // this.authenticationGuard.setCanActivate(this.hasLoggedIn);
        // reset
        this.store.dispatch(new DashboardActions.Logout({logout: false}));
      }
    });
  }
  ngOnInit(): void {
    this.registerEvents();
  }

  registerEvents () {
    // do other event subscriptions here.
    // this.store.subscribe((result) => {
    //   console.log(result.login);
    // });
  }

}
