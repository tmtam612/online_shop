import React, {useState} from 'react';
import {addToCart } from '../actions/index';
import {useDispatch} from "react-redux";

const Product = (props) => {
    const [product, setproduct] = useState(props.product);
    const dispatch = useDispatch();
    React.useEffect(() => {
        if(props) {
            setproduct(props.product);
        }
    }, [props]);
    const addProduct = (product) => {
        if(product.inventory > 0) {
            product.inventory -= 1;
            dispatch(addToCart(product));
        }
    }
    return (
        <div className="col-lg-4 col-md-6 mb-r">
            <div className="card text-center card-cascade narrower">
                <div className="view overlay hm-white-slight z-depth-1">
                    <img
                        src={`${process.env.PUBLIC_URL}/img/bff22bd75897b1c9e886.jpg`}
                        className="img-fluid" alt={product.name}
                    />
                    <a>
                        <div className="mask waves-light waves-effect waves-light"></div>
                    </a>
                </div>
                <div className="card-body">
                    <h4 className="card-title">
                        <strong>
                            <a>{product.name}</a>
                        </strong>
                    </h4>
                    <p className="card-text">
                        {product.description}
                    </p>
                    <div className="card-footer">
                        <span className="left">{product.price}$</span>
                        <span className="left">{product.inventory}</span>
                        <span className="right">
                            <a className="btn-floating blue-gradient"
                                data-toggle="tooltip"
                                data-placement="top"
                                title=""
                                data-original-title="Add to Cart"
                            >
                                <i onClick={() => addProduct(product)} className="fa fa-shopping-cart"></i>
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;