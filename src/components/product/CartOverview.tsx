import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/helper";

const CartOverview = () => {
	const cartState = useSelector((store: any) => store.cart);

	return (
		<div className="cart-overview sticky-bottom">
			<div className="cart-overview__details">
				<h3 className="cart-overview__text">
					Total Products
					<span className="cart-overview__sub-text"> in the cart</span> :{" "}
					{cartState.totalProducts}
				</h3>
				<h3 className="cart-overview__text">
					Total Price : {formatCurrency(cartState.totalPrice)}
				</h3>
			</div>
			<Link to="/cart" className="btn--secondary">
				View Cart
			</Link>
		</div>
	);
};

export default CartOverview;
