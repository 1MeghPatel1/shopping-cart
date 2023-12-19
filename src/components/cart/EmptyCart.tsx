import { Link } from "react-router-dom";

function EmptyCart() {
	return (
		<div className="cart__empty-cart-page">
			<div className="cart__empty-cart">
				<Link className="nav-link btn--primary" to="/app">
					&larr; Back to Home
				</Link>

				<p className="cart__empty-cart-text">
					Your cart is still empty. Start adding some Products :)
				</p>
			</div>
		</div>
	);
}

export default EmptyCart;
