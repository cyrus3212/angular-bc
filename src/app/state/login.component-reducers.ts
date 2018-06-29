import * as LoginActions from './login.component-actions';
import { LoginModel } from '../login/LoginModel';

export interface State {
    userName: string;
    password: string;
    loginData: LoginModel;
    error: {};
}

const initialState: State = {
    userName: '',
    password: '',
    loginData: new LoginModel(),
    error: {}
};

export function reducer (state = initialState, action: LoginActions.All): State {
    switch (action.type) {
        case LoginActions.LOGIN: {
            return {
                ...state,
                userName: action.payload.userName,
                password: action.payload.password
            };
        }
        case LoginActions.LOGIN_SUCCESS: {
            return {
                ...state,
                loginData: action.payload
            };
        }
        case LoginActions.LOGIN_FAIL: {
            return {
                ...state,
                error: {errorMessage: 'test message'}
            };
        }
        default:
            return state;
    }
}
