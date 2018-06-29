import * as fromLogin from './login.component-reducers';
import * as fromDashboard from './dashboard.component-reducers';
import * as fromReward from './create-promo.component-reducers';

export interface State {
    login: fromLogin.State;
    dashboard: fromDashboard.State;
    reward: fromReward.State;
}

export const reducers = {
    login: fromLogin.reducer,
    dashboard: fromDashboard.reducer,
    reward: fromReward.reducer
};

// Getter for clean select action.
export function getLoginData(state: State) {
    console.log(state, '-----');
    return state.login.loginData;
}

export function getLogoutState (state: State) {
    return state.dashboard.hasLoggedOut;
}

export function getRewards (state: State) {
    console.log(state, 'STATE');
    return state.reward.rewards;
}
