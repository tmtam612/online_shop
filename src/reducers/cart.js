import * as types from '../constants/ActionType';
var data = [];
var initialState = data ? data : [];

const cartRedux = (state = initialState, action) => {
    var index = -1;
    var {product} = action;
    var cart = [...state];
    switch (action.type) {
        case types.ADD_TO_CART:
            index = findIndex(state, product);
            if(index !== -1){
                cart[index] = {
                    ...cart[index],
                    quantity: cart[index].quantity + 1
                }
            }
            else {
                cart.push({
                    product,
                    quantity: 1
                });
            }
            return cart;
        case types.DELETE_PRODUCT_IN_CART:
            index = findIndex(state, product);
            if(index !== -1){
                cart.splice(index, 1);
            }
            return cart;
        case types.UPDATE_PRODUCT_IN_CART:
            index = findIndex(state, product);
            if(index !== -1){
                cart[index] = {
                   ...cart[index],
                   quantity: action.quantity
               }
            }
            return cart;
        default:
            return state;
    }
};

var findIndex = (cart, product) => {
    var index = -1;
    if(cart.length > 0){
        for(var i = 0; i < cart.length; i++)
            if( cart[i].product.id === product.id){
                index = i;
                break;
            }
    }
    return index;
}

export default cartRedux;