export class CardProfile {
    id = '1';
}

export class WinningParameter {
    max_winning_per_hour = '';
    account_range_from = '';
    account_range_to = '';
    chance_factor = '';
    card_profile = [{
        id: '1'
    }];
}

export class Promo {
    id = 0;
    promo_id = '';
    title = '';
    description = '';
    status = 0;
    type = '0';
    reward_id = 0;
    credit_load_amount = 0;
    info_text1 = '';
    info_text2 = '';
    text_placement = 0;
    text_movement = '0';
    background_image = '';
    character_image = '';
    success_text = '';
    success_image = '';
    fade_timer = 0;
    fade_move_pattern = '';
    fade_movement_speed = '';
    winning_parameters = [{
        max_winning_per_hour: 0,
        account_range_from: '',
        account_range_to: '',
        chance_factor: 0,
        card_profile: [{
            id: 1
        }]
    }];
    carousel_sequence = '';
    carousel_interval_speed = '';
    carousel_pause_speed = '';
    carousel_images = [{
        image: '',
        winning_parameters: [{
            max_winning_per_hour: 0,
            account_range_from: '',
            account_range_to: '',
            chance_factor: 0,
            card_profile: [{
                id: 1
            }]
        }]
    }];
    created_at = {};
}

export const PROMO_DEFAULT: Promo = {
    id: 0,
    promo_id: '',
    title: '',
    description: '',
    status: 0,
    type: '1',
    reward_id: 0,
    credit_load_amount: 0,
    info_text1: '',
    info_text2: '',
    text_placement: 0,
    text_movement: '0',
    background_image: '',
    character_image: '',
    success_text: '',
    success_image: '',
    fade_timer: 0,
    fade_move_pattern: '',
    fade_movement_speed: '',
    winning_parameters: [],
    carousel_sequence: '',
    carousel_interval_speed: '',
    carousel_pause_speed: '',
    carousel_images: [{
        image: '',
        winning_parameters: []
    }],
    created_at: {}
};

