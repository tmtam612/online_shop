import React, { useState } from 'react';
import axios from 'axios';
import CartItem from '../components/CartItem';
import { useSelector} from "react-redux";

const CartContainer = () => {
    console.log(1);
    const [cart, setCart] = useState([]);
    const cartStore = useSelector( state => state.cart);
    React.useEffect(() => {
        setCart(cartStore);
    }, [cartStore]);
    const showCartItem = (cart) => {
        console.log(cart);
        var result = <tr><td></td></tr>;
        if (cart.length > 0) {
            result = cart.map((item, index) => {
                return <CartItem
                    key={index}
                    item={item}
                    index={index}
                />
            });
        }
        return result;
    }
    const showTotalAmount = cart => {
        var total = 0;
        if(cart.length > 0){
            cart.forEach(element => {
                if(element.quantity > 0) {
                    return total+= element.product.price * element.quantity;
                } else {
                    return total;
                }
                
            });
        }
        return total;
    }
    const saveBill = (cart) => {
        var order = {};
        cart.map((item, key) => {
            return order[item.product.id] = item.quantity;
        });
        order = JSON.stringify(order);
        axios.post('http://127.0.0.1:8000/api/orders', order)
          .then(function (response) {
            alert('thanh toán thành công');
          })
          .catch(function (error) {
            alert('thanh toán thất bại');
          });
    }
    return (
        <section className="section">
            <div className="table-responsive">
                <table className="table product-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Sản Phẩm</th>
                            <th>Giá</th>
                            <th>Số Lượng</th>
                            <th>Tổng Cộng</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>   
                        {showCartItem(cart)}
                        <tr>
                            <td colSpan="3"></td>
                            <td>
                                <h4>
                                    <strong>Tổng Tiền</strong>
                                </h4>
                            </td>
                            <td>
                                <h4>
                                    <strong>{showTotalAmount(cart)}$</strong>
                                </h4>
                            </td>
                            <td colSpan="3">
                                <button type="button" onClick={() => saveBill(cart)} className="btn btn-primary waves-effect waves-light">Complete purchase
                                    <i className="fa fa-angle-right right"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default CartContainer;