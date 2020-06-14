import React, { useState, useCallback } from 'react';
import ProductsContainer from './containers/ProductsContainer';
import CartContainer from './containers/CartContainer';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {getListProducts} from './actions/index';

function App() {
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
        <div>
            {
                products && products.length > 0 &&
                <>
                    <main id="mainContainer">
                        <div className="container">
                            <ProductsContainer props={products}/>
                            <CartContainer />
                        </div>
                    </main>
                </>
            }
        </div>
    );
    
}

export default App;