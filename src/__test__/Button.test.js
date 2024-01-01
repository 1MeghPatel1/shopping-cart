import { jsx as _jsx } from "react/jsx-runtime";
import userEvent from "@testing-library/user-event";
import Button from "../components/ui/Button";
import { render, screen } from "../test-utils";
describe("Button-Test", () => {
    const MockClickFunction = jest.fn();
    test("Rendering Button Component", async () => {
        render(_jsx(Button, { onClick: MockClickFunction, type: "primary", children: "Sample Button" }));
        const button = screen.getByRole("button", {
            name: /Sample Button/i,
        });
        await userEvent.click(button);
        expect(MockClickFunction).toHaveBeenCalled();
        expect(button).toBeInTheDocument();
        expect(button).not.toBeDisabled();
        expect(button).toHaveClass("btn--primary");
    });
    test("Rendering Button Component", () => {
        render(_jsx(Button, { type: "primaryTwo", isDisabled: true, children: "Sample Button" }));
        const button = screen.getByRole("button", {
            name: /Sample Button/i,
        });
        expect(button).toBeInTheDocument();
        expect(button).toBeDisabled();
        expect(button).toHaveClass("btn--primary-2");
    });
});
