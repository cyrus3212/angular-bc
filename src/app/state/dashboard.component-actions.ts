import { Action } from '@ngrx/store';
import { LoginModel } from '../login/LoginModel';

export const LOGOUT = '[Dashboard] Logout';

export class Logout implements Action {
    readonly type = LOGOUT;
    constructor(public payload: {
        logout: boolean
    }) {}
}

// Login | LoginSuccess | LoginFail
export type All = Logout;
