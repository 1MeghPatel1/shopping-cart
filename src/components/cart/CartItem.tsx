import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";

const CartItem = () => {
	return (
		<li className="cart__item">
			<div className="cart__item-img-title-box">
				<img src="" alt="cart item" className="cart__item-img" />
				<h2 className="cart__item-title">Something</h2>
			</div>
			<div className="cart__actions">
				<UpdateItemQuantity />
				<DeleteItem />
			</div>
		</li>
	);
};

export default CartItem;
