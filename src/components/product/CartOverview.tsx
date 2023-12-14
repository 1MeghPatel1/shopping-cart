import { Link } from "react-router-dom";

const CartOverview = () => {
	return (
		<div className="cart-overview hide sticky-bottom">
			<div className="cart-overview__details">
				<h3 className="cart-overview__text">
					Total Products
					<span className="cart-overview__sub-text"> in the cart</span> : 3
				</h3>
				<h3 className="cart-overview__text">Total Price : 300</h3>
			</div>
			<Link to="/cart" className="btn--secondary">
				View Cart
			</Link>
		</div>
	);
};

export default CartOverview;
