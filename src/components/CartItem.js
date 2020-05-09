import React, { Component } from 'react';
import * as Message from '../constants/Message';

import React, { useState, useEffect } from 'react';

const CartItem = ({item, onUpdateCartItem}) => {
// function CartItem(props) {
    // var { item } = props;
    const [numb, setNumb] = useState(0);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        // setNumb(numb - 1);
        // setTotal((numb -1) * 500);
    });
    const onUpdateItem = (condition) => {
        if(numb > 0) {
            if(condition == 'minus') {
                setNumb(numb - 1);
            } else {
                setNumb(numb + 1);
            }
        } else if(numb == 0 && condition == 'plus') {
            setNumb(numb + 1);
        }
    }
    React.useEffect(() => {
        setTotal(numb * 500);
    }, [numb]);

    return (
        <tr>
            <th scope="row">
                <img src={item.product.image}
                    alt={item.product.image} className="img-fluid z-depth-0" />
            </th>
            <td>
                <h5>
                    <strong>{item.product.name}</strong>
                </h5>
            </td>
            <td>{item.product.price}$</td>
            <td className="center-on-small-only">
                <span className="qty">{numb}</span>
                <div className="btn-group radio-group" data-toggle="buttons">
                    <label
                        className="btn btn-sm btn-primary
                            btn-rounded waves-effect waves-light"
                        onClick={() => {
                                onUpdateItem('minus')
                            }
                        }
                    >
                        <a href="#">—</a>
                    </label>
                    <label
                        className="btn btn-sm btn-primary
                            btn-rounded waves-effect waves-light"
                        onClick={() => {
                            onUpdateItem('plus')
                        }}
                    >
                        <a href="#">+</a>
                    </label>
                </div>
            </td>
            <td>{total}$</td>
            <td>
                <button
                    type="button"
                    className="btn btn-sm btn-primary waves-effect waves-light"
                    data-toggle="tooltip"
                    data-placement="top"
                    title=""
                    data-original-title="Remove item"
                    // onClick={() => onDelete(item.product)}
                >
                    X
                    </button>
            </td>
        </tr>
    );
}

export default CartItem;



