import { MemoryRouter } from "react-router-dom";
import { act, render, screen } from "../../test-utils";
import Cart from "./CartPage";
import { mockLocalStorage } from "../../mocks/mockLocalStorage";
import store from "../../store";
import { assignCart } from "../../slices/cartSlice";
import userEvent from "@testing-library/user-event";
import * as apiServices from "../../services/apiServices";

const { getItemMock } = mockLocalStorage();
const userInfo = {
	id: 1,
	firstName: "Megh",
	lastName: "Patel",
	email: "megh@gmail.com",
	refreshToken:
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjozMywiZmlyc3ROYW1lIjoiTWVnaCIsImxhc3ROYW1lIjoiUGF0ZWwiLCJlbWFpbCI6Im1lZ2hwYXRlbEBnbWFpbC5jb20ifSwiaWF0IjoxNzAzMjUzMjk0LCJle",
	accessToken:
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7I…wOTR9.CkWyQL2gHJfBiKqye8fOnWLREEmhGz2e9OQzVzgDsp4",
};

const deleteCartQtyMock = jest.spyOn(apiServices, "deleteCartQty");
const addCartQtyMock = jest.spyOn(apiServices, "postCart");
const deleteCartProductMock = jest.spyOn(apiServices, "deleteCartProduct");

describe("Cart Page Tests", () => {
	beforeEach(() => {
		getItemMock.mockReturnValue(JSON.stringify(userInfo));
	});
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

	test("Test for all the elements rendering successfully inside cart page", async () => {
		let cartContainer;
		await act(async () => {
			const { container } = await render(
				<MemoryRouter>
					<Cart />
				</MemoryRouter>
			);
			cartContainer = container;
		});

		const cartItemImg = screen.getByRole("img", { name: /cart item/i });
		const cartItemHeading = screen.getByRole("heading", {
			name: /mens casual premium slim fit t\-shirts/i,
		});
		const cartItemMinusBtn = cartContainer!.querySelector(
			".cart__qty-container button:first-child"
		);
		const cartItemAddBtn = cartContainer!.querySelector(
			".cart__qty-container button:last-child"
		);
		const cartItemDeleteBtn = cartContainer!.querySelector(
			".cart__actions .btn--delete"
		);
		const cartItemPrice = screen.getByText(/₹22\.00/i);

		expect(cartItemImg).toBeInTheDocument();
		expect(cartItemHeading).toBeInTheDocument();
		expect(cartItemMinusBtn).toBeInTheDocument();
		expect(cartItemAddBtn).toBeInTheDocument();
		expect(cartItemDeleteBtn).toBeInTheDocument();
		expect(cartItemPrice).toBeInTheDocument();
	});

	test("testing if add qty. and minus qty. and delete product button works", async () => {
		let cartContainer;
		await act(async () => {
			const { container } = await render(
				<MemoryRouter>
					<Cart />
				</MemoryRouter>
			);
			cartContainer = container;
		});

		const cartItemMinusBtn = cartContainer!.querySelector(
			".cart__qty-container button:first-child"
		);

		const cartItemAddBtn = cartContainer!.querySelector(
			".cart__qty-container button:last-child"
		);

		const cartItemDeleteBtn = cartContainer!.querySelector(
			".cart__actions .btn--delete"
		);

		await userEvent.click(cartItemMinusBtn);
		expect(deleteCartQtyMock).toHaveBeenCalled();

		await userEvent.click(cartItemAddBtn);
		expect(addCartQtyMock).toHaveBeenCalled();

		await userEvent.click(cartItemDeleteBtn);
		expect(deleteCartProductMock).toHaveBeenCalled();
	});
});
