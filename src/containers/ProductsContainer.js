import React, {  useState } from 'react';
import Product from "../components/Product";


function ProductsContainer({props}) {
	const [products] = useState(props);
	return (
		<section className="section">
            <h1 className="section-heading">Danh Sách Sản Phẩm</h1>
            <div className="row">
			{products.map((product) => (
				<Product
					key={product.id}
					product={product}
				/>
			))}
            </div >
        </section>
	);
}


export default ProductsContainer;
