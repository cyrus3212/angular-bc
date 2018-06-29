import * as DashboardActions from './dashboard.component-actions';

export interface State {
    hasLoggedOut: boolean;
    error: {};
}

const initialState: State = {
    hasLoggedOut: false,
    error: {}
};

export function reducer (state = initialState, action: DashboardActions.All) : State {
    switch (action.type) {
        case DashboardActions.LOGOUT: {
            return {
                ...state,
                hasLoggedOut: action.payload.logout
            };
        }
        default:
            return state;
    }
}
