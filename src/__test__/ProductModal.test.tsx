import userEvent from "@testing-library/user-event";
import { act, render, screen } from "../test-utils";
import ProductSection from "../components/product/ProductSection";

describe("testing Product Modal", () => {
	test("opening product modal when a product is clicked and closing when close btn is clicked", async () => {
		let productsContainer;
		await act(async () => {
			const { container } = await render(<ProductSection />);
			productsContainer = container;
		});

		const product = productsContainer!.querySelector(
			".products__item:nth-child(1)"
		);

		await userEvent.click(product);

		const modalHeading = screen.queryByRole("heading", {
			name: /fjallraven \- foldsack no\. 1 backpack, fits 15 laptops/i,
		});
		expect(modalHeading).toBeInTheDocument();

		//Now closing modal

		const closeButton = screen.getByRole("button", { name: /❌/i });
		await userEvent.click(closeButton);

		expect(modalHeading).not.toBeInTheDocument();
	});

	test("test all the elements of product modal", async () => {
		let productsContainer;
		await act(async () => {
			const { container } = await render(<ProductSection />);
			productsContainer = container;
		});

		const product = productsContainer!.querySelector(
			".products__item:nth-child(1)"
		);

		await userEvent.click(product);

		const modalHeading = screen.queryByRole("heading", {
			name: /fjallraven \- foldsack no\. 1 backpack, fits 15 laptops/i,
		});
		const modalDescription = screen.getByText(
			/your perfect pack for everyday use and walks in the forest\. stash your laptop \(up to 15 inches\) in the padded sleeve, your everyday/i
		);
		const modalImg = screen.getByRole("img", { name: /product photo/i });
		const modalCategory = screen.getByRole("heading", {
			name: /men's clothing/i,
		});

		expect(modalHeading).toBeInTheDocument();
		expect(modalDescription).toBeInTheDocument();
		expect(modalImg).toBeInTheDocument();
		expect(modalCategory).toBeInTheDocument();
	});
});
