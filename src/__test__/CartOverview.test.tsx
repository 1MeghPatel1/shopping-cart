import { MemoryRouter } from "react-router-dom";
import { act, render, screen } from "../test-utils";
import MainApp from "../components/main-app/MainApp";
import store from "../store";
import { assignCart } from "../slices/cartSlice";

describe("cartoverview-tests", () => {
	test("displaying cart overview whenever there is a product in cart", async () => {
		await act(
			async () =>
				await render(
					<MemoryRouter>
						<MainApp />
					</MemoryRouter>
				)
		);

		const cartTotalProductElement = await screen.findByRole("heading", {
			name: /total products in the cart : 1/i,
		});
		const cartViewCartButton = await screen.findByRole("link", {
			name: /view cart/i,
		});

		expect(cartTotalProductElement).toBeInTheDocument();
		expect(cartViewCartButton).toBeInTheDocument();
	});

	test("Hiding CartOverview component when cart is empty", async () => {
		await act(
			async () =>
				await render(
					<MemoryRouter>
						<MainApp />
					</MemoryRouter>
				)
		);
		await act(async () => {
			await store.dispatch(assignCart([]));
		});
		const cartTotalProductElement = screen.queryByRole("heading", {
			name: /total products in the cart : 1/i,
		});
		expect(cartTotalProductElement).not.toBeInTheDocument();
	});
});
