import { HttpErrorResponse, HttpResponse,  HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';

import { LoginModel } from './LoginModel';

import { ProgressDialog } from '../dialog/progress.dialog';
import { MessageDialogComponent } from '../dialog/message-dialog.component';

import * as LoginActions from '../state/login.component-actions';
import * as fromRoot from '../state/reducers';
import { ApiService } from '../service/api.service';
import { Localization } from '../constants/localization.en';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

export interface Login {
    username: string;
    password: string;
}

@Component({
  selector: 'app-bc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginForm: FormGroup;
    loginCreds: Login = {
        username: 'user@coderepubliq.com',
        password: 'password'
    };
    // password = '!pi3.1416';

    loginData: Observable<LoginModel>;

    title = 'Beep Card: Login';

    constructor(
        private store: Store<fromRoot.State>,
        private apiService: ApiService,
        private dialog: MdDialog,
        private snackbar: MdSnackBar
    ) {
        store.select(state => state.login.password);
        this.loginData = store.select(fromRoot.getLoginData);

        const _fb = new FormBuilder();
        this.loginForm = _fb.group({
            username: ['', [<any>Validators.required, <any>Validators.minLength(4)]],
            password: ['', [<any>Validators.required, <any>Validators.minLength(4)]]
        });
    }
    onSave(login: Login, isValid: boolean) {
        console.log('Login Data:', login);
        if (isValid) {
            this.loginCreds = login;
            this.onLoginClick();
        }
        console.log('Is Valid? ', isValid);
    }
    onLoginClick() {
        const mDialog = this.dialog.open(ProgressDialog, {disableClose: true});
        this.apiService.login(this.loginCreds.username, this.loginCreds.password).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
                console.log(event.loaded + ' | ' + event.total);
                const percentDone = Math.round(100 * event.loaded / event.total);
                console.log(`File is ${percentDone}% uploaded.`);
            } else if (event instanceof HttpResponse) {
                mDialog.close();
                console.log(event.body);
                if (event.body.token) {
                    this.apiService.setAuthData(event.body, true);
                }
                this.store.dispatch(new LoginActions.LoginSuccess({id: 1, name: 'logged in user', loginSuccess: true}));
            }
        }, error => {
                mDialog.close();
                console.log(error);
                let message = error.message || Localization.DEFAULT_NETWORK_ERROR;
                const messages = [];

                if (error instanceof HttpErrorResponse || error instanceof HttpErrorResponse) {
                    message = '';
                    if (error.error.email instanceof Array) {
                        error.error.email.forEach(element => {
                            messages.push(element);
                        });
                    } else {
                        if (error.error.email) {
                            messages.push(error.error.email);
                        }
                    }
                    if (error.error.password instanceof Array) {
                        error.error.password.forEach(element => {
                            messages.push(element);
                        });
                    } else {
                        if (error.error.password) {
                            messages.push(error.error.password);
                        }
                    }
                    if (messages.length === 0) {
                        message = Localization.DEFAULT_NETWORK_ERROR;
                    }
                }
                const errorDialog = this.dialog.open(MessageDialogComponent, {
                        data: {
                            title: Localization.MESSAGE_ERROR,
                            message: message,
                            messages: messages,
                            hasActions: true
                        }
                    });
        });
    }
}
