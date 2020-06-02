import * as types from '../constants/ActionType';
const initialState = [];
const products = (state = initialState, action) => {
    switch(action.type){
        case types.GET_LIST_PRODUCTS: {
            return {...state, products: action.products};
            break;
        }
        default: 
            return {...state};
    }
};

export default products;