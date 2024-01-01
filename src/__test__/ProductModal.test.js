import { jsx as _jsx } from "react/jsx-runtime";
import userEvent from "@testing-library/user-event";
import { act, render, screen } from "../test-utils";
import ProductSection from "../components/product/ProductSection";
import ProductModal from "../components/product/ProductModal";
import store from "../store";
import { assignCart } from "../slices/cartSlice";
describe("testing Product Modal", () => {
    test("opening product modal when a product is clicked and closing when close btn is clicked", async () => {
        let productsContainer;
        await act(async () => {
            const { container } = await render(_jsx(ProductSection, {}));
            productsContainer = container;
        });
        const product = productsContainer.querySelector(".products__item:nth-child(1)");
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
            const { container } = await render(_jsx(ProductSection, {}));
            productsContainer = container;
        });
        const product = productsContainer.querySelector(".products__item:nth-child(1)");
        await userEvent.click(product);
        const modalHeading = screen.queryByRole("heading", {
            name: /fjallraven \- foldsack no\. 1 backpack, fits 15 laptops/i,
        });
        const modalDescription = screen.getByText(/your perfect pack for everyday use and walks in the forest\. stash your laptop \(up to 15 inches\) in the padded sleeve, your everyday/i);
        const modalImg = screen.getByRole("img", { name: /product photo/i });
        const modalCategory = screen.getByRole("heading", {
            name: /men's clothing/i,
        });
        expect(modalHeading).toBeInTheDocument();
        expect(modalDescription).toBeInTheDocument();
        expect(modalImg).toBeInTheDocument();
        expect(modalCategory).toBeInTheDocument();
    });
    test("Adding to cart on click of addtocart button", async () => {
        const setIsDisabledMock = jest.fn();
        const setOpenItemdMock = jest.fn();
        render(_jsx(ProductModal, { id: 1, setOpenItem: setOpenItemdMock, isDisabled: false, setIsDisabled: setIsDisabledMock }));
        const addToCartBtn = screen.getByRole("button", {
            name: /Add to Cart/i,
        });
        expect(addToCartBtn).toBeInTheDocument();
        await userEvent.click(addToCartBtn);
    });
    test("Showing Update Qty component when cart is not empty", async () => {
        const setIsDisabledMock = jest.fn();
        const setOpenItemdMock = jest.fn();
        const { container } = render(_jsx(ProductModal, { id: 1, setOpenItem: setOpenItemdMock, isDisabled: false, setIsDisabled: setIsDisabledMock }));
        await act(async () => {
            await store.dispatch(assignCart([
                {
                    createdAt: "2023-12-22T12:55:36.682Z",
                    id: 209,
                    isDeleted: false,
                    product: {
                        id: 1,
                        name: "Mens Casual Premium Slim Fit T-Shirts",
                        description: "Slim-fitting style, contrast raglan long sleeve, t…e round neckline includes a three-button placket.",
                        category: "men's clothing",
                        price: 22,
                    },
                    productId: 2,
                    quantity: 1,
                    updatedAt: "2023-12-22T12:55:36.682Z",
                    userId: 33,
                },
            ]));
        });
        const qtyText = container.querySelector(".cart__qty-container");
        expect(qtyText).toBeInTheDocument();
    });
});
