import { Action } from '@ngrx/store';
import { LoginModel } from '../login/LoginModel';

export const LOGIN = '[Login] Login';
export const LOGIN_SUCCESS = '[Login] Login Success';
export const LOGIN_FAIL = '[Login] Login Fail';

export class Login implements Action {
    readonly type = LOGIN;
    constructor(public payload: {
        userName: string,
        password: string
    }) {}
}

export class LoginSuccess implements Action {
    readonly type = LOGIN_SUCCESS;
    // todo: change payload to what login data you wanna pass
    constructor(public payload: LoginModel) {}
}

export class LoginFail implements Action {
    readonly type = LOGIN_FAIL;
    // todo: change payload to what login data you wanna pass
    constructor(public payload: {}) {}
}

export type All = Login | LoginSuccess | LoginFail;
