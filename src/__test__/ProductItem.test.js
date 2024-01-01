import { jsx as _jsx } from "react/jsx-runtime";
import userEvent from "@testing-library/user-event";
import ProductSection from "../components/product/ProductSection";
import { act, render, screen } from "../test-utils";
import { commonMockResponse } from "../mocks/handlers";
import * as apiServices from "../services/apiServices";
import ProductItem from "../components/product/ProductItem";
const { product, productId, quantity } = commonMockResponse.data;
const deleteCartQtyMock = jest.spyOn(apiServices, "deleteCartQty");
const postCartMock = jest.spyOn(apiServices, "postCart");
const setIsDisabledMock = jest.fn();
describe("Tests for Individual Product Item", () => {
    test("Adding Product Item to cart", async () => {
        let productsContainer;
        await act(async () => {
            const { container } = await render(_jsx(ProductSection, {}));
            productsContainer = container;
        });
        const AddtoCartButtons = productsContainer.querySelectorAll(".products__item-details-box button");
        for (let addtoCartBtn of AddtoCartButtons) {
            await userEvent.click(addtoCartBtn);
        }
        expect(postCartMock).toHaveBeenCalledTimes(7);
        postCartMock.mockReset();
    });
    test("When Error occurrs while Adding Product Item to cart", async () => {
        postCartMock.mockReset();
        postCartMock.mockResolvedValueOnce({
            success: false,
            message: "something went wrong",
        });
        let productsContainer;
        await act(async () => {
            const { container } = await render(_jsx(ProductSection, {}));
            productsContainer = container;
        });
        const AddtoCartButtons = productsContainer.querySelectorAll(".products__item-details-box button");
        await userEvent.click(AddtoCartButtons[0]);
        expect(postCartMock).toHaveBeenCalled();
    });
    test("rendering 1st product and displaying its quantity and add & minus button functionality", async () => {
        postCartMock.mockReset();
        let productContainer;
        await act(async () => {
            const { container } = await render(_jsx(ProductItem, { id: productId, category: product.category, name: product.name, price: product.price, image: product.image, qty: quantity, isDisabled: false, setIsDisabled: setIsDisabledMock }));
            productContainer = container;
        });
        const qtyElement = screen.getByText(/[1-9] qty\./i);
        const MinusButton = productContainer.querySelector(".cart__qty-container button:first-child");
        const AddButton = productContainer.querySelector(".cart__qty-container button:last-child");
        //Checking quantity container is rendered successfully
        expect(qtyElement).toBeInTheDocument();
        expect(AddButton).toBeInTheDocument();
        expect(MinusButton).toBeInTheDocument();
        // now checking quantity container's functionality
        await userEvent.click(AddButton);
        expect(postCartMock).toHaveBeenCalledTimes(1);
        await userEvent.click(MinusButton);
        expect(deleteCartQtyMock).toHaveBeenCalledTimes(1);
    });
    test("if quantity is 0 then do not render qty container", async () => {
        await act(async () => {
            await render(_jsx(ProductItem, { id: productId, category: product.category, name: product.name, price: product.price, image: product.image, qty: 0, isDisabled: false, setIsDisabled: setIsDisabledMock }));
            const qtyElement = screen.queryByText(/[1-9] qty\./i);
            expect(qtyElement).not.toBeInTheDocument();
        });
    });
});
