import React, { useState } from 'react';
import { addToCart } from '../actions/index';
import { useDispatch } from "react-redux";

const Product = (props) => {
    const [product, setproduct] = useState(props.product);
    const dispatch = useDispatch();
    React.useEffect(() => {
        if (props) {
            setproduct(props.product);
        }
    }, [props]);
    return (
        <div className="col-lg-4 col-md-6 mb-r">
            <div className="card text-center card-cascade narrower">
                <div className="view overlay hm-white-slight z-depth-1">
                    <img
                        src={`http://127.0.0.1:8000${props.product.image}`}
                        className="img-fluid" alt={product.name}
                    />
                    <div className="mask waves-light waves-effect waves-light"></div>
                </div>
                <div className="card-body">
                    <h4 className="card-title">
                        <strong>
                            {product.name}
                        </strong>
                    </h4>
                    <p className="card-text">
                        {product.description}
                    </p>
                    <div className="card-footer">
                        <span className="left">{product.price}$</span>
                        <span className="right">
                            <button className="btn-floating blue-gradient"
                                data-toggle="tooltip"
                                data-placement="top"
                                title=""
                                data-original-title="Add to Cart"
                            >
                                <i onClick={() => dispatch(addToCart(product))} className="fa fa-shopping-cart"></i>
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;