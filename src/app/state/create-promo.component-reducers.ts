import * as RewardAction from './create-promo.component-actions';
import { Reward } from '../model/reward.model';

export interface State {
    rewards: any;
}

const initialState: State = {
    rewards: []
};

export function reducer (state = initialState, action: RewardAction.All): State {
    switch (action.type) {
        case RewardAction.SET_REWARDS: {
            console.log(action.payload.rewards, 'HEE');
            return {
                ...state,
                rewards: action.payload.rewards,
            };
        }
        default:
            return state;
    }
}
