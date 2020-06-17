import React, { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updateProductInCart, deleteProductInCart } from '../actions/index';
import {addToCart } from '../actions/index';
const CartItem = (props) => {
    const dispatch = useDispatch();
    const [item, setitem] = useState(props.item)
    const setTotal = (item) => {
        return item.product.price *  item.quantity;
    }
    React.useEffect(() => {
        if(props.item.quantity >= 0) {
            setitem(props.item);
        }
    }, [props])
    const addProductInCart = (product) => {
        if(product.inventory > 0) {
            product.inventory -= 1;
            dispatch(addToCart(product));
        }
    }
    const deleteProduct = (product, quantity) => {
        if(quantity > 0) {
            product.inventory += 1;
            dispatch(updateProductInCart(product, quantity - 1));
        } else if (quantity == 0) {
            
        }
    }

    const deleteProducts = (item) => {
        item.product.inventory+= item.quantity;
        dispatch(deleteProductInCart(item.product));
    }
    return (
        <tr>
            <th scope="row">
                <img src={`${process.env.PUBLIC_URL}/img/bff22bd75897b1c9e886.jpg`}
                    alt={item.product.image} className="img-fluid z-depth-0" />
            </th>
            <td>
                <h5>
                    <strong>{item.product.name}</strong>
                </h5>
            </td>
            <td>{item.product.price}$</td>
            <td className="center-on-small-only">
                <span className="qty">{item.quantity}</span>
                <div className="btn-group radio-group" data-toggle="buttons">
                    <label 
                        className="btn btn-sm btn-primary
                        btn-rounded waves-effect waves-light"
                        onClick={() => deleteProduct(item.product, item.quantity)}
                    >
                        —
                    </label>
                    <label 
                        className="btn btn-sm btn-primary
                        btn-rounded waves-effect waves-light"
                        onClick={() => addProductInCart(item.product)}
                    >
                        +
                    </label>
                </div>
            </td>
            <td>{setTotal(item)}$</td>
            <td>
                <button
                    type="button"
                    className="btn btn-sm btn-primary waves-effect waves-light"
                    data-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-original-title="Remove item"
                    onClick={()=> deleteProducts(item)}
                >
                    X
                </button>
            </td>
        </tr>
    );  
}; 

export default CartItem;