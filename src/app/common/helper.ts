export const enum SORT {
    NONE = 0,
    ASC = 1,
    DESC = 2,
}
export const IMPORT_TYPES = {
    CARD_PROFILE: 'card_profiles'
};
export const sortArrayByKey = (array, key, order) => {
    return array.sort(function(a, b) {
        const x = a[key]; const y = b[key];
        if (order === SORT.ASC) {
            return ((x < y) ? 1 : ((x > y) ? 0 : 1));
        } else if (order === SORT.DESC) {
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        }
    });
};
