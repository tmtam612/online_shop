import React, { useState } from 'react';
import {useDispatch} from "react-redux";
import {updateProductInCart, deleteProductInCart } from '../actions/index';
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
                        onClick={() => dispatch(updateProductInCart(item.product, item.quantity - 1))}
                    >
                        —
                    </label>
                    <label 
                        className="btn btn-sm btn-primary
                        btn-rounded waves-effect waves-light"
                        onClick={() => dispatch(updateProductInCart(item.product, item.quantity + 1))}
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
                    onClick={()=> dispatch(deleteProductInCart(item.product))}
                >
                    X
                </button>
            </td>
        </tr>
    );  
}; 

export default CartItem;