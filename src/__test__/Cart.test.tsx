import { MemoryRouter } from "react-router-dom";
import { act, render, screen } from "../test-utils";
import Cart from "../components/cart/CartPage";
// import { mockLocalStorage } from "../../mocks/mockLocalStorage";
import store from "../store";
import { assignCart } from "../slices/cartSlice";

// const { getItemMock } = mockLocalStorage();
// const userInfo = {
// 	id: 1,
// 	firstName: "Megh",
// 	lastName: "Patel",
// 	email: "megh@gmail.com",
// 	refreshToken:
// 		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjozMywiZmlyc3ROYW1lIjoiTWVnaCIsImxhc3ROYW1lIjoiUGF0ZWwiLCJlbWFpbCI6Im1lZ2hwYXRlbEBnbWFpbC5jb20ifSwiaWF0IjoxNzAzMjUzMjk0LCJle",
// 	accessToken:
// 		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7I…wOTR9.CkWyQL2gHJfBiKqye8fOnWLREEmhGz2e9OQzVzgDsp4",
// };

describe("Cart Page Tests", () => {
	test("Testing for successfully rendering when there is a product inside cart page", async () => {
		await act(async () => {
			await render(
				<MemoryRouter>
					<Cart />
				</MemoryRouter>
			);
		});

		const cartHeading = screen.queryByRole("heading", {
			level: 2,
			name: /your cart, megh/i,
		});
		expect(cartHeading).toBeInTheDocument();
	});

	test("Test for empty cart page when cart is empty", async () => {
		await act(async () => {
			await render(
				<MemoryRouter>
					<Cart />
				</MemoryRouter>
			);
		});

		await act(async () => {
			await store.dispatch(assignCart([]));
		});

		const emptyCartBtn = screen.getByRole("link", {
			name: /Back to Home/i,
		});
		expect(emptyCartBtn).toBeInTheDocument();
	});
});
