import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Cart from '../components/Cart';
import CartItem from '../components/CartItem';
import CartResult from '../components/CartResult';

import { deleteProductInCart, updateProductInCart } from '../actions/index';
import { connect } from "react-redux";



class CartContainer extends Component {
    render() {
        var { cart } = this.props;
        return (
            <Cart>
                {this.showCartItem(cart)}
                {this.showTotalAmount(cart)}
            </Cart>
        );
    }

    showCartItem = cart => {
        var result = <tr><td></td></tr>;
        if (cart.length > 0) {
            result = cart.map((item, index) => {
                return <CartItem
                    key={index}
                    item={item}
                    index={index}
                    onDeleteProductInCart={this.props.onDeleteProductInCart}
                    onUpdateCartItem={this.props.onUpdateCartItem}
                />
            });
        }
        return result;
    }

    showTotalAmount = cart => {
        var result = null;
        if (cart.length > 0) {
            result = <CartResult cart={cart} />;
        }
        return result;
    }
}

CartContainer.propTypes = {
    cart: PropTypes.arrayOf(
        PropTypes.shape({
            product: PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired,
                image: PropTypes.string.isRequired,
                price: PropTypes.number.isRequired,
                rating: PropTypes.number.isRequired,
                inventory: PropTypes.number.isRequired
            }),
            quantity: PropTypes.number.isRequired
        })
    ).isRequired,
    onDeleteProductInCart: PropTypes.func.isRequired,
    onUpdateCartItem: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    cart: state.cart
});

const mapDispatchToProps = dispatch => ({
    onDeleteProductInCart: product => dispatch(deleteProductInCart(product)),
    onUpdateCartItem: (product, quantity) => dispatch(updateProductInCart(product, quantity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);