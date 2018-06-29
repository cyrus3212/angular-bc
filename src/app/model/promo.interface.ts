// import { WinningParameter } from './winning-parameters.model';
export interface CardProfile {
    id: string;
}

export interface WinningParameter {
    max_winning_per_hour: string;
    account_range_from: string;
    account_range_to: string;
    chance_factor: string;
    card_profile?: CardProfile[];
}

export interface CarouselImages {
    image: string;
    winning_parameters: WinningParameter[];
}

export interface IPromo {
    id?: string;
    promo_id?: string;
    title: string;
    description: string;
    status: string;
    type: string;
    reward_id: string;
    credit_load_amount: string;
    info_text1: string;
    info_text2: string;
    text_placement: string;
    text_movement: string;
    background_image: string;
    character_image: string;
    success_text: string;
    success_image: string;
    fade_timer: string;
    fade_move_pattern?: string;
    fade_movement_speed?: string;
    winning_parameters?: WinningParameter[];
    carousel_sequence?: string;
    carousel_interval_speed?: string;
    carousel_pause_speed?: string;
    carousel_images?: CarouselImages[];
}
// New Promo
export const NPromo: IPromo = {
    id: '',
    promo_id: '',
    title: '',
    description: '',
    status: '',
    type: '',
    reward_id: '',
    credit_load_amount: '',
    info_text1: '',
    info_text2: '',
    text_placement: '',
    text_movement: '',
    background_image: '',
    character_image: '',
    success_text: '',
    success_image: '',
    fade_timer: '',
    fade_move_pattern: '',
    fade_movement_speed: '',
    winning_parameters: [{
        max_winning_per_hour: '',
        account_range_from: '',
        account_range_to: '',
        chance_factor: '',
        card_profile: [{
            id: ''
        }]
    }],
    carousel_sequence: '',
    carousel_interval_speed: '',
    carousel_pause_speed: '',
    carousel_images: [{
        image: '',
        winning_parameters: [{
            max_winning_per_hour: '',
            account_range_from: '',
            account_range_to: '',
            chance_factor: '',
            card_profile: [{
                id: ''
            }]
        }]
    }],
};
