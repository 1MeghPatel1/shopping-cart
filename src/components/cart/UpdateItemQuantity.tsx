import { deleteCartQty, postCart } from "../../services/apiServices";
import Button from "../ui/Button";

type propsType = {
	qty: number;
	id: number;
};

const UpdateItemQuantity = ({ qty, id }: propsType) => {
	const handleAddClick = async () => {
		try {
			const res = await postCart(id);
			console.log(res);
		} catch (err) {
			console.log(err);
		}
	};

	const handleMinusClick = async () => {
		try {
			const res = await deleteCartQty(id);
			console.log(res);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="cart__qty-container">
			<Button onClick={handleMinusClick} type="primaryTwo">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="16"
					width="14"
					viewBox="0 0 448 512"
				>
					<path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
				</svg>
			</Button>
			<span className="cart__qty-num">{qty} qty.</span>
			<Button onClick={handleAddClick} type="primaryTwo">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="16"
					width="14"
					viewBox="0 0 448 512"
				>
					<path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
				</svg>
			</Button>
		</div>
	);
};

export default UpdateItemQuantity;
