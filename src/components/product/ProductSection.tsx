import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { getProducts } from "../../services/apiServices";
import { storeProducts } from "../../slices/productsSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductSection = () => {
	const dispatch = useDispatch();
	const products = useSelector((store: any) => store.products.products);

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 8;
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
	const totalPages = Math.ceil(products.length / itemsPerPage);

	const paginate = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	useEffect(() => {
		const fetchProducts = async () => {
			const res = await getProducts();
			dispatch(storeProducts(res.data));
		};
		fetchProducts();
	}, [dispatch]);

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
			<ProductList currentItems={currentItems} />

			<div className="products__paginate-btns">
				{Array.from({ length: totalPages }, (_, index) => (
					<button
						className={`products__paginate-btn ${
							currentPage === index + 1 ? "products__active-page" : ""
						}`}
						key={index + 1}
						onClick={() => paginate(index + 1)}
					>
						{index + 1}
					</button>
				))}
			</div>
		</section>
	);
};

export default ProductSection;
