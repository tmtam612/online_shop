import React, {
	useCallback,
	useState
} from 'react';
import ProductManageList from '../components/ProductManageList';
import {
	connect,
	useSelector,
	useDispatch
} from "react-redux";
import axios from "axios";
import {
	addToCart,
	changeMessage
} from '../actions/index';
import {
	getListProducts
} from '../actions/index';

function ProductManageListContainer() {
	const dispatch = useDispatch();
	const productStore = useSelector(state => state.products);
	const [products, setProducts] = useState([]);
	const getProducts = useCallback(
		(data) => dispatch(getListProducts(data)),
		[dispatch],
	);

	//Fetch lại data khi có sự thay đổi state.
	React.useEffect(() => {
		axios.get("http://127.0.0.1:8000/api/products/")
			.then((response) => {
				getProducts(response.data);
				console.log("products", productStore);
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
		<div >
			<ProductManageList products={products}
				setProducts={setProducts}
			/>
		</div>
	)
}

export default ProductManageListContainer;