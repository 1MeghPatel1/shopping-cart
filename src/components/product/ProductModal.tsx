import { Dispatch, SetStateAction, useState } from "react";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "./../../utils/helper";
import toast from "react-hot-toast";
import { getCart, postCart } from "../../services/apiServices";
import { assignCart } from "../../slices/cartSlice";

type propsType = {
	id: number | null;
	setOpenItem(id: any): void;
	isDisabled: boolean;
	setIsDisabled: Dispatch<SetStateAction<boolean>>;
};

const ProductModal = ({
	id,
	setOpenItem,
	isDisabled,
	setIsDisabled,
}: propsType) => {
	const [isVisible, setIsVisible] = useState(false);

	const product = useSelector((store: any) => {
		return store.products.products.find((product: any) => id === product.id);
	});

	const cart = useSelector((store: any) => {
		return store.cart.cart;
	});

	const cartProduct = cart.find((item: any) => item.id === id);

	const qty = cartProduct ? cartProduct.quantity : 0;

	const dispatch = useDispatch();

	const handleClick = () => {
		setOpenItem(null);
		setIsVisible(false);
	};

	const handleAddClick = async () => {
		setIsDisabled(true);
		try {
			const toastId = toast.loading("Adding Item to the Cart...");
			const res = await postCart(product.id);
			if (res.success) {
				const res = await getCart();
				dispatch(assignCart(res.data));
				toast.success("Added to the Cart", {
					id: toastId,
				});
			}
		} catch (err) {
			console.log(err);
			toast.error("Something Went Wrong");
		} finally {
			setIsDisabled(false);
		}
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
								<UpdateItemQuantity
									isDisabled={isDisabled}
									setIsDisabled={setIsDisabled}
									id={product.id}
									qty={qty}
								/>
							) : (
								<button
									onClick={handleAddClick}
									disabled={isDisabled}
									className="btn--secondary-2"
								>
									Add to Cart
								</button>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductModal;
