import userEvent from "@testing-library/user-event";
import { act, render, screen } from "../test-utils";
import ProductSection from "../components/product/ProductSection";
import * as apiServices from "../services/apiServices";
import store from "../store";

const searchProductReqMock = jest.spyOn(apiServices, "getProduct");

describe("Products Tests", () => {
	test("Testing that product section's 1st page is getting rendered successfully", async () => {
		let productsContainer;
		await act(async () => {
			const { container } = await render(<ProductSection />);
			productsContainer = container;
		});

		const productsHeadings =
			productsContainer!.querySelectorAll(".products__item");

		const productsImages = productsContainer!.querySelectorAll(
			".products__item-img"
		);
		const productsTitles = productsContainer!.querySelectorAll(
			".products__item-title"
		);
		const productsCategoryText =
			productsContainer!.querySelectorAll(".rating__text");
		const productsPrices = productsContainer!.querySelectorAll(
			".products__item-price"
		);
		const AddtoCartButtons = productsContainer!.querySelectorAll(
			".products__item-details-box button"
		);
		const paginationBtns = screen.getAllByRole("button", { name: /[1-9]/i });

		expect(productsHeadings).toHaveLength(8);
		expect(productsImages).toHaveLength(8);
		expect(productsTitles).toHaveLength(8);
		expect(productsCategoryText).toHaveLength(8);
		expect(productsPrices).toHaveLength(8);
		expect(AddtoCartButtons).toHaveLength(8);
		expect(paginationBtns).toHaveLength(2);
	});

	test("Render 2nd page of products pagination on click of button", async () => {
		let productsContainer;
		await act(async () => {
			const { container } = await render(<ProductSection />);
			productsContainer = container;
		});

		const secondPageBtn = screen.getByRole("button", { name: /2/i });

		await userEvent.click(secondPageBtn);

		const productsHeadings =
			productsContainer!.querySelectorAll(".products__item");

		const productsImages = productsContainer!.querySelectorAll(
			".products__item-img"
		);
		const productsTitles = productsContainer!.querySelectorAll(
			".products__item-title"
		);
		const productsCategoryText =
			productsContainer!.querySelectorAll(".rating__text");
		const productsPrices = productsContainer!.querySelectorAll(
			".products__item-price"
		);
		const AddtoCartButtons = productsContainer!.querySelectorAll(
			".products__item-details-box button"
		);
		const paginationBtns = screen.getAllByRole("button", { name: /[1-9]/i });

		expect(productsHeadings).toHaveLength(4);
		expect(productsImages).toHaveLength(4);
		expect(productsTitles).toHaveLength(4);
		expect(productsCategoryText).toHaveLength(4);
		expect(productsPrices).toHaveLength(4);
		expect(AddtoCartButtons).toHaveLength(4);
		expect(paginationBtns).toHaveLength(2);
	});

	test("testing products search", async () => {
		let productsContainer;
		await act(async () => {
			const { container } = await render(<ProductSection />);
			productsContainer = container;
		});

		const searchProductInput = screen.getByPlaceholderText(
			/search for specific product/i
		);
		const serachButton = screen.getByRole("button", { name: /search/i });

		expect(searchProductInput).toBeInTheDocument();
		expect(serachButton).toBeInTheDocument();

		//search query lenth more than 2
		await userEvent.type(searchProductInput, "Mens");
		await userEvent.click(serachButton);

		expect(searchProductReqMock).toHaveBeenCalled();

		await userEvent.clear(searchProductInput);
		//search query lenth less than 2
		await act(async () => {
			await userEvent.type(searchProductInput, "M");
		});
	});
});
