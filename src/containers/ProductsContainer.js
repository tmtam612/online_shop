import React, { Component, useEffect } from 'react';
import Products from '../components/Products';
import Product from "../components/Product";
import { connect, useSelector ,useDispatch} from "react-redux";
import PropTypes from 'prop-types';
import { addToCart, changeMessage, loadProducts, action } from '../actions/index';

function ProductsContainer() {

    const dispatch = useDispatch();
    useFetching(action);
    const products = useSelector(
        (state) => {
            return state.products.news || [];
        }
      );
    const showProducts = (products) => {
        var elmProducts = [];
        if (products) {
            elmProducts = products.map(
                product => {
                    return <Product
                        key={product.id}
                        product={product}
                        onAddToCart={ product => dispatch(addToCart(product))}
                        onChangeMessage={ message => dispatch(changeMessage(message))}
                    />
                }
            );
        }
        return elmProducts;
    }

    return (
        <Products>
            {showProducts(products)}
        </Products>
    );
}

const useFetching = () => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(action());
    }, []);
  } 

export default ProductsContainer;
