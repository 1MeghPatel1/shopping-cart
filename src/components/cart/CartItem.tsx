import UpdateItemQuantity from "./UpdateItemQuantity";
import { formatCurrency } from "./../../utils/helper";
import Button from "../ui/Button";
import { deleteCartProduct, getCart } from "../../services/apiServices";
import { useDispatch } from "react-redux";
import { assignCart } from "../../slices/cartSlice";
import toast from "react-hot-toast";

type cartItemType = {
	title: string;
	image: string;
	quantity: number;
	totalPrice: number;
	id: number;
	isDisabled: boolean;
	setIsDisabled: any;
};

const CartItem = ({
	title,
	image,
	quantity,
	totalPrice,
	id,
	isDisabled,
	setIsDisabled,
}: cartItemType) => {
	const dispatch = useDispatch();

	const handleDeleteClick = async () => {
		const toastId = toast.loading("Deleting Product from Cart...");
		setIsDisabled(true);
		try {
			const res = await deleteCartProduct(id);
			if (res.success) {
				const res = await getCart();
				if (res.success) {
					dispatch(assignCart(res.data));
					toast.success("Product Deleted from Cart", {
						id: toastId,
					});
				}
			}
		} catch (err) {
			console.log(err);
			toast.error("Something Went Wrong", {
				id: toastId,
			});
		} finally {
			setIsDisabled(false);
		}
	};

	return (
		<li className="cart__item">
			<div className="cart__item-img-title-box">
				<img src={image} alt="cart item" className="cart__item-img" />
				<h2 className="cart__item-title">{title}</h2>
			</div>
			<div className="cart__actions">
				<UpdateItemQuantity
					id={id}
					qty={quantity}
					isDisabled={isDisabled}
					setIsDisabled={setIsDisabled}
				/>
				<span className="cart__item-price">{formatCurrency(totalPrice)}</span>
				<Button
					isDisabled={isDisabled}
					onClick={handleDeleteClick}
					type="delete"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="16"
						width="14"
						viewBox="0 0 448 512"
					>
						<path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
					</svg>
				</Button>
			</div>
		</li>
	);
};

export default CartItem;
