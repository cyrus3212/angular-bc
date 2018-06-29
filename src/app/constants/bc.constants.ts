export class BCConstants {
    static BASE_URL = 'http://ce08ba84.ngrok.io/api';
    // static BASE_URL = 'http://192.168.254.35:4200/api';
    // api endpoints
    static LOGIN = BCConstants.BASE_URL + '/login';
    static CREATE_PROMO = BCConstants.BASE_URL + '/promotions';
    static GET_PROMOS = BCConstants.CREATE_PROMO;
    // end api endpoints
    // global keys
    static USER_DATA = '_key_user_data';
    // end global keys
    static GET_REWARDS = BCConstants.BASE_URL + '/rewards';
    static UPLOAD_IMAGE = BCConstants.BASE_URL + '/image-upload';
    static IMPORT = BCConstants.BASE_URL + '/import';
}
