import * as types from '../constants/ActionType';
const initialState = [];
const products = (state = initialState, action) => {
    switch(action.type){
        case types.GET_LIST_PRODUCTS: {
            console.log('action', action);
            
            return {
                ...state, 
                products: action.products
            };
        }
        default: 
            return {...state};
    }
};

export default products;