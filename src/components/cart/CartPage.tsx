import Button from "../ui/Button";
import Header from "../ui/Header";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "./EmptyCart";
import { useEffect, useState } from "react";
import { getCart } from "../../services/apiServices";
import { assignCart } from "../../slices/cartSlice";
import Loading from "../ui/Loading";

function Cart() {
	const [isLoading, setIsLoading] = useState(false);
	const cartState = useSelector((store: any) => store.cart);
	const [isDisabled, setIsDisabled] = useState(false);
	const userInfo = JSON.parse(localStorage.getItem("userInfo")!);

	const dispatch = useDispatch();

	useEffect(() => {
		const fetchCart = async () => {
			setIsLoading(true);
			try {
				const res = await getCart();
				if (res.success) {
					dispatch(assignCart(res.data));
				}
			} catch (err) {
				console.log(err);
			} finally {
				setIsLoading(false);
			}
		};
		fetchCart();
	}, [dispatch]);
	return (
		<>
			<Header />
			{isLoading && <Loading />}
			{isLoading || (
				<>
					{cartState.totalProducts === 0 ? (
						<EmptyCart />
					) : (
						<div className="cart">
							<h2 className="cart__username">
								Your cart, {userInfo.firstName}
							</h2>

							<ul className="cart__list">
								{cartState.cart.map((cartItem: any) => {
									console.log();
									return (
										<CartItem
											image={cartItem.image}
											title={cartItem.name}
											totalPrice={cartItem.totalPrice}
											quantity={cartItem.quantity}
											id={cartItem.id}
											key={cartItem.id}
											isDisabled={isDisabled}
											setIsDisabled={setIsDisabled}
										/>
									);
								})}
							</ul>

							<div className="cart__btns">
								<Button isDisabled={false} type="primary">
									Order Now
								</Button>
								<Button isDisabled={false} type="tertiary">
									Clear cart
								</Button>
							</div>
						</div>
					)}
				</>
			)}
		</>
	);
}

export default Cart;
