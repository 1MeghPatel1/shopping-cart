import Button from "../ui/Button";
import Header from "../ui/Header";
import CartItem from "./CartItem";

function Cart() {
	return (
		<>
			<Header />
			<div className="cart">
				<h2 className="cart__username">Your cart, username</h2>

				<ul className="cart__list">
					<CartItem />
					<CartItem />
					<CartItem />
				</ul>

				<div className="cart__btns">
					<Button type="primary">Order Now</Button>
					<Button type="tertiary">Clear cart</Button>
				</div>
			</div>
		</>
	);
}

export default Cart;
