import { useState } from "react";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";
import { useSelector } from "react-redux";
import { formatCurrency } from "./../../utils/helper";

type propsType = {
	id: number | null;
	setOpenItem(id: any): void;
};

const ProductModal = ({ id, setOpenItem }: propsType) => {
	const [isVisible, setIsVisible] = useState(false);

	const product = useSelector((store: any) => {
		return store.products.products.find((product: any) => id === product.id);
	});

	const qty = product?.Cart?.length > 0 ? product?.Cart[0].quantity : 0;

	const handleClick = () => {
		setOpenItem(null);
		setIsVisible(false);
	};

	return (
		<div
			className={`products__modal-box ${
				isVisible || id !== null ? "" : "hide"
			}`}
		>
			{product && (
				<div className="products__modal">
					<button
						className="products__modal-close"
						onClick={() => {
							handleClick();
						}}
					>
						❌
					</button>
					<img
						src={product.image}
						alt="product photo"
						className="products__modal-img"
					/>
					<div className="products__modal-details-container">
						<h1 className="products__modal-title">{product.name}</h1>
						<p className="products__modal-description">{product.description}</p>
						<h3 className="products__modal-category">{product.category}</h3>
						<p className="products__modal-price">
							{formatCurrency(product.price)}
						</p>
						<div className="products__modal-actions">
							{qty ? (
								<UpdateItemQuantity id={product.id} qty={qty} />
							) : (
								<button className="btn--secondary-2">Add to Cart</button>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductModal;
