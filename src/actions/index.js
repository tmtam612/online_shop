import * as types from '../constants/ActionType';
import axios from "axios";

export function loadProducts(){
    return(dispatch)=>{
        return axios.get("http://127.0.0.1:8000/api/products/").then((response)=>{ 
            dispatch(getListProducts(response.data));
        })
    }
}

export function getListProducts(products) {
    return{
        type: types.GET_LIST_PRODUCTS,
        products: products,
    }
}
export const addToCart = (product, quantity) => ({
    type: types.ADD_TO_CART,
    product,
    quantity
});

export const changeMessage = message => ({
    type: types.CHANGE_MESSAGE,
    message
});

export const deleteProductInCart = product =>({
    type: types.DELETE_PRODUCT_IN_CART,
    product
});

export const updateProductInCart = (product, quantity) =>({
    type: types.UPDATE_PRODUCT_IN_CART,
    product,
    quantity
});