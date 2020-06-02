import * as types from '../constants/ActionType';
const initialState = [];
// const products = (state = initialState, action) => {
//     switch(action.type){
//         case types.GET_LIST_PRODUCTS: {
//             return {...state, products: action.products};
//             break;
//         }
//         default: 
//             return [];
//             break;
//     }
// };

const products = (state = initialState, actions) => {
    switch (actions.type) {
        case 'GET_LIST':
            return {...state, data: actions.data, loading: true};
        case 'NEWS_RECEIVED':
            return {...state, news: actions.data, loading: false};
        case 'SAVE_DATA':
            return {...state, data: actions.data, loading: true};
        default:
            return {...state, loading: true};
    }
};
export default products;