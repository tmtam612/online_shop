import React, {  useState } from 'react';
import Product from "../components/Product";
import {useDispatch} from "react-redux";
import {addToCart, changeMessage } from '../actions/index';


function ProductsContainer({props}) {
	const dispatch = useDispatch();
	const [products] = useState(props);
	return (
		<section className="section">
            <h1 className="section-heading">Danh Sách Sản Phẩm</h1>
            <div className="row">
			{products.map((product) => (
				<Product
					key={product.id}
					product={product}
					onAddToCart={ product => dispatch(addToCart(product))}
					onChangeMessage={ message => dispatch(changeMessage(message))}
				/>
			))}
            </div >
        </section>
	);
}


export default ProductsContainer;
