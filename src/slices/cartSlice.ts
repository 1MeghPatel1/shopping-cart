import { createSlice } from "@reduxjs/toolkit";
import { ProductPropsType } from "../components/product/ProductItem";

type initialStateType = {
	cart: ProductPropsType[];
	totalProducts: number;
	totalPrice: number;
};

const initialState: initialStateType = {
	cart: [],
	totalProducts: 0,
	totalPrice: 0,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		assignCart(state, action) {
			state.cart = action.payload.map((cartItem: any) => {
				const localCartItem = {
					id: cartItem.product.id,
					image: cartItem.product.image,
					name: cartItem.product.name,
					price: cartItem.product.price,
					quantity: cartItem.quantity,
					totalPrice: cartItem.product.price * cartItem.quantity,
				};
				return localCartItem;
			});
			state.totalPrice = state.cart.reduce((acc, curr) => {
				return (acc = acc + curr.totalPrice);
			}, 0);
			state.totalProducts = state.cart.length;
		},

		// addItem(state, action) {
		// 	// payload = newItem
		// 	state.cart.push(action.payload);
		// },
		// deleteItem(state, action) {
		// 	// payload = productId
		// 	state.cart = state.cart.filter((item) => item.id !== action.payload);
		// },
		// increaseItemQuantity(state, action) {
		// 	// payload = productId
		// 	const item = state.cart.find((item) => item.id === action.payload);
		// 	if (!item) return;
		// 	item.qty++;
		// },
		// decreaseItemQuantity(state, action) {
		// 	// payload = productId
		// 	const item = state.cart.find((item) => item.id === action.payload);
		// 	if (!item) return;
		// 	item.qty--;
		// 	if (item.qty === 0) cartSlice.caseReducers.deleteItem(state, action);
		// },
		// clearCart(state) {
		// 	state.cart = [];
		// },
	},
});

export const {
	// addItem,
	// increaseItemQuantity,
	// decreaseItemQuantity,
	// clearCart,
	// deleteItem,
	assignCart,
} = cartSlice.actions;
export default cartSlice.reducer;
