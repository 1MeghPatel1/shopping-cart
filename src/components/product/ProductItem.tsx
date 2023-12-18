import { useEffect } from "react";
import { formatCurrency } from "../../utils/helper";
import UpdateItemQuantity from "./../cart/UpdateItemQuantity";
import { postCart } from "../../services/apiServices";

type PropsType = {
	id: number;
	category: string;
	image: string;
	name: string;
	price: number;
	qty: number;
};

const ProductItem = ({ category, image, name, price, id, qty }: PropsType) => {
	const truncatedName =
		name.split(" ").length > 3
			? name.split(" ").slice(0, 4).join(" ") + "..."
			: name;

	const handleAddClick = async () => {
		try {
			const res = await postCart(id);
			console.log(res);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<article className="products__item" data-product-id={id}>
				<img src={image} alt="" className="products__item-img" />
				<div className="products__item-container">
					<div className="products__item-title-box">
						<h3 className="products__item-title">{truncatedName}</h3>
						<div className="rating__box">
							<p className="rating__text">{category}</p>
						</div>
					</div>
					<div className="products__item-details-box">
						<p className="products__item-price">{formatCurrency(price)}</p>
						{qty ? (
							<UpdateItemQuantity id={id} qty={qty} />
						) : (
							<button className="btn--secondary-2" onClick={handleAddClick}>
								Add to Cart
							</button>
						)}
					</div>
				</div>
			</article>
		</>
	);
};

export default ProductItem;
