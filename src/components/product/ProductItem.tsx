import { Dispatch, SetStateAction } from "react";
import { formatCurrency } from "../../utils/helper";
import UpdateItemQuantity from "./../cart/UpdateItemQuantity";
import { getCart, postCart } from "../../services/apiServices";
import { useDispatch } from "react-redux";
import { assignCart } from "../../slices/cartSlice";
import toast from "react-hot-toast";

export type ProductType = {
	id: number;
	category: string;
	image: string;
	name: string;
	price: number;
	qty: number;
};

type ProductPropsType = ProductType & {
	isDisabled: boolean;
	setIsDisabled: Dispatch<SetStateAction<boolean>>;
};

const ProductItem = ({
	category,
	image,
	name,
	price,
	id,
	qty,
	isDisabled,
	setIsDisabled,
}: ProductPropsType) => {
	const truncatedName =
		name.split(" ").length > 3
			? name.split(" ").slice(0, 4).join(" ") + "..."
			: name;

	const dispatch = useDispatch();

	const handleAddClick = async () => {
		setIsDisabled(true);
		try {
			const toastId = toast.loading("Adding Item to the Cart...");
			const res = await postCart(id);
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
							<UpdateItemQuantity
								isDisabled={isDisabled}
								setIsDisabled={setIsDisabled}
								id={id}
								qty={qty}
							/>
						) : (
							<button
								disabled={isDisabled}
								className="btn--secondary-2"
								onClick={handleAddClick}
							>
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
