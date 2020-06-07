import React from 'react';

const Product = (props) => {
    const { product } = props;

    const onAddToCart = product => {
        props.onAddToCart(product);
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
                        <span className="right">
                            <a className="btn-floating blue-gradient"
                                data-toggle="tooltip"
                                data-placement="top"
                                title=""
                                data-original-title="Add to Cart"
                            >
                                <i onClick={() => onAddToCart(product)} className="fa fa-shopping-cart"></i>
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;