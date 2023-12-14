import ProductList from "./ProductList";

const ProductSection = () => {
	return (
		<section className="products">
			<div className="products__search-container">
				<h1 className="products__heading">Our Products</h1>
				<div className="products__search-input-box">
					<input
						type="text"
						className="products__search-input"
						placeholder="Search for specific product"
					/>
					<button className="btn--primary">Search</button>
				</div>
			</div>
			<ProductList />
		</section>
	);
};

export default ProductSection;
