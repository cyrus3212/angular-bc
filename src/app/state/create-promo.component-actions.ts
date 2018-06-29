import { Action } from '@ngrx/store';
import { Reward } from '../model/reward.model';

export const SET_REWARDS = '[Set Reward] Set Reward';

export class AReward implements Action {
    readonly type = SET_REWARDS;

    constructor (public payload: {
    rewards: any}) {
        console.log(payload, 'REWARD PAYLOAD');
    }
}

export type All = AReward;
