import { MemoryRouter } from "react-router-dom";
import MainApp from "../components/main-app/MainApp";
import { act, render } from "../test-utils";
import { mockIntersectionObserver, mockViewport } from "jsdom-testing-mocks";
import * as apiServices from "../services/apiServices";
import { server } from "../mocks/server";

const io = mockIntersectionObserver();

const getCartMock = jest.spyOn(apiServices, "getCart");

const MainAppTestComponent = () => {
	return (
		<MemoryRouter initialEntries={["/app"]}>
			<MainApp />
		</MemoryRouter>
	);
};

describe("MainApp-tests", () => {
	test("test for removing sticky class from header when user scrolls down", async () => {
		const viewport = mockViewport({});

		let MainAppContainer;
		await act(async () => {
			const { container } = await render(<MainAppTestComponent />);
			MainAppContainer = container;
		});

		const productsSection = MainAppContainer!.querySelector(".products");
		const header = MainAppContainer!.querySelector(".header");

		expect(productsSection).toBeInTheDocument();
		expect(header).toBeInTheDocument();
		expect(header).toHaveClass("sticky");

		//when viewport width is > 900
		viewport.set({ width: "910px", height: "900px" });
		io.enterNode(productsSection, {
			threshold: 0.43,
		});
		expect(header).not.toHaveClass("sticky");

		//when viewport width is btw 700 and 900
		viewport.set({ width: "800px", height: "900px" });
		io.enterNode(productsSection, {
			threshold: 0.4,
		});
		expect(header).not.toHaveClass("sticky");

		//when viewport width is < 700
		viewport.set({ width: "500px", height: "900px" });
		io.enterNode(productsSection, {
			threshold: 0.22,
		});
		expect(header).not.toHaveClass("sticky");
	});

	test("test for adding sticky class to Products search component when user scrolls down", async () => {
		const viewport = mockViewport({});

		let MainAppContainer;
		await act(async () => {
			const { container } = await render(<MainAppTestComponent />);
			MainAppContainer = container;
		});

		const productsSection = MainAppContainer!.querySelector(".products");
		const productsSearchContainer = MainAppContainer!.querySelector(
			".products__search-container"
		);

		expect(productsSection).toBeInTheDocument();
		expect(productsSearchContainer).toBeInTheDocument();
		expect(productsSearchContainer).not.toHaveClass("sticky");

		//when viewport width is > 900
		viewport.set({ width: "910px", height: "900px" });
		io.enterNode(productsSection, {
			threshold: 0.43,
		});
		expect(productsSearchContainer).toHaveClass("sticky");

		//when viewport width is btw 700 and 900
		viewport.set({ width: "800px", height: "900px" });
		io.enterNode(productsSection, {
			threshold: 0.4,
		});
		expect(productsSearchContainer).toHaveClass("sticky");

		//when viewport width is < 700
		viewport.set({ width: "500px", height: "900px" });
		io.enterNode(productsSection, {
			threshold: 0.22,
		});
		expect(productsSearchContainer).toHaveClass("sticky");
	});

	test("for failing get cart request and showing error", async () => {
		server.close();
		getCartMock.mockRejectedValue({
			status: 400,
			message: "Something Went Wrong",
		});
		await act(async () => {
			await render(<MainAppTestComponent />);
		});

		expect(getCartMock).toHaveBeenCalled();
	});
});
