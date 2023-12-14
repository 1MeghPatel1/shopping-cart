import RatingStar from "../ui/RatingStar";
import UpdateItemQuantity from "./../cart/UpdateItemQuantity";

const ProductItem = () => {
	return (
		<article className="products__item">
			<img src="" alt="" className="products__item-img" />
			<div className="products__item-container">
				<div className="products__item-title-box">
					<h3 className="products__item-title">Product Item</h3>
					<div className="rating__box">
						<RatingStar />
						<p className="rating__text">135 reviews</p>
					</div>
				</div>
				<div className="products__item-details-box">
					<p className="products__item-price">235</p>
					{true ? (
						<UpdateItemQuantity />
					) : (
						<button className="btn--primary-2">Add to Cart</button>
					)}
				</div>
			</div>
		</article>
	);
};

export default ProductItem;
