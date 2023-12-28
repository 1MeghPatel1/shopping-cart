import { MemoryRouter } from "react-router-dom";
import Cart from "../components/cart/CartPage";
import { act, render, screen } from "../test-utils";
import userEvent from "@testing-library/user-event";
import * as apiServices from "../services/apiServices";
import { server } from "../mocks/server";

const deleteCartQtyMock = jest.spyOn(apiServices, "deleteCartQty");
const addCartQtyMock = jest.spyOn(apiServices, "postCart");
const getCartMock = jest.spyOn(apiServices, "getCart");
const deleteCartProductMock = jest.spyOn(apiServices, "deleteCartProduct");

describe("cart-item tests", () => {
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

		expect(getCartMock).toHaveBeenCalled();
	});

	test("testing if add qty. and minus qty. throws error", async () => {
		deleteCartQtyMock.mockReset();
		deleteCartQtyMock.mockResolvedValueOnce({
			success: false,
			message: "something went wrong",
		});

		addCartQtyMock.mockReset();
		addCartQtyMock.mockResolvedValueOnce({
			success: false,
			message: "something went wrong",
		});

		let cartContainer;
		await act(async () => {
			const { container } = await render(
				<MemoryRouter>
					<Cart />
				</MemoryRouter>
			);
			cartContainer = container;
		});

		getCartMock.mockReset();

		const cartItemMinusBtn = cartContainer!.querySelector(
			".cart__qty-container button:first-child"
		);

		const cartItemAddBtn = cartContainer!.querySelector(
			".cart__qty-container button:last-child"
		);

		await userEvent.click(cartItemMinusBtn);
		expect(deleteCartQtyMock).toHaveBeenCalled();

		await userEvent.click(cartItemAddBtn);
		expect(addCartQtyMock).toHaveBeenCalled();

		expect(getCartMock).not.toHaveBeenCalled();
	});

	test("testing if add qty. and minus qty. is successful but getting cart state from api throw error", async () => {
		deleteCartQtyMock.mockReset();
		addCartQtyMock.mockReset();
		let cartContainer;
		await act(async () => {
			const { container } = await render(
				<MemoryRouter>
					<Cart />
				</MemoryRouter>
			);
			cartContainer = container;
		});

		getCartMock.mockReset();
		getCartMock.mockResolvedValueOnce({
			success: false,
			message: "something went wrong",
		});

		const cartItemMinusBtn = cartContainer!.querySelector(
			".cart__qty-container button:first-child"
		);

		const cartItemAddBtn = cartContainer!.querySelector(
			".cart__qty-container button:last-child"
		);

		await userEvent.click(cartItemMinusBtn);
		expect(deleteCartQtyMock).toHaveBeenCalled();

		await userEvent.click(cartItemAddBtn);
		expect(addCartQtyMock).toHaveBeenCalled();

		expect(getCartMock).toHaveBeenCalled();
	});

	test("when an error occurrs while deleting product", async () => {
		deleteCartProductMock.mockReset();

		deleteCartProductMock.mockResolvedValueOnce({
			success: false,
			message: "something went wrong",
		});

		let cartContainer;
		await act(async () => {
			const { container } = await render(
				<MemoryRouter>
					<Cart />
				</MemoryRouter>
			);
			cartContainer = container;
		});

		getCartMock.mockReset();
		const cartItemDeleteBtn = cartContainer!.querySelector(
			".cart__actions .btn--delete"
		);

		expect(cartItemDeleteBtn).toBeInTheDocument();
		await userEvent.click(cartItemDeleteBtn);
		expect(deleteCartProductMock).toHaveBeenCalled();
		expect(getCartMock).not.toHaveBeenCalled();
	});

	test("when deleting product is successful but getting cart from api fails", async () => {
		deleteCartProductMock.mockReset();

		deleteCartProductMock.mockResolvedValueOnce({
			success: true,
			message: "deleted successfully",
		});

		let cartContainer;
		await act(async () => {
			const { container } = await render(
				<MemoryRouter>
					<Cart />
				</MemoryRouter>
			);
			cartContainer = container;
		});

		getCartMock.mockReset();
		getCartMock.mockResolvedValueOnce({
			success: false,
			message: "something went wrong",
		});
		const cartItemDeleteBtn = cartContainer!.querySelector(
			".cart__actions .btn--delete"
		);

		expect(cartItemDeleteBtn).toBeInTheDocument();
		await userEvent.click(cartItemDeleteBtn);
		expect(deleteCartProductMock).toHaveBeenCalled();
		expect(getCartMock).toHaveBeenCalled();
	});
});
