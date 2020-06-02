import React, { useCallback, useState } from 'react';
import axios from "axios";
import Products from '../components/Products';
import Product from "../components/Product";
import {useDispatch, useSelector} from "react-redux";
import {addToCart, changeMessage } from '../actions/index';
import {getListProducts} from '../actions/index';

function ProductsContainer() {
	const dispatch = useDispatch();

	const productStore = useSelector(state => state.products);
	const [products, setProducts] = useState([]);
	const getProducts = useCallback(
		(data) => dispatch(getListProducts(data)),
		[dispatch],
	);

	React.useEffect(() => {
		axios.get("http://127.0.0.1:8000/api/products/")
			.then((response) => { 
				getProducts(response.data);
			}).catch((err) => console.log('err', err));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	React.useEffect(() => {
		if (!productStore.products) {
			return;
		}

		setProducts(productStore.products);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productStore]);


	return (
		<Products>
			{products.map((product) => (
				<Product
					key={product.id}
					product={product}
					onAddToCart={ product => dispatch(addToCart(product))}
					onChangeMessage={ message => dispatch(changeMessage(message))}
				/>
			))}
		</Products>
	);
}


export default ProductsContainer;
