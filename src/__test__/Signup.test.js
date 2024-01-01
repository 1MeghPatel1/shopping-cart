import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { render, screen, waitFor } from "@testing-library/react";
import Auth from "../components/authentication/Auth";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "../components/authentication/LoginForm";
import SignUp from "../components/authentication/SignUpForm";
import * as apiServices from "../services/apiServices";
const SignUpMock = jest.spyOn(apiServices, "signUpRequest");
const SignUpTestComponent = () => {
    return (_jsx(MemoryRouter, { initialEntries: ["/auth/signup"], children: _jsx(Routes, { children: _jsxs(Route, { path: "/auth", element: _jsx(Auth, {}), children: [_jsx(Route, { index: true, element: _jsx(Navigate, { replace: true, to: "login" }) }), _jsx(Route, { path: "login", element: _jsx(LoginForm, {}) }), _jsx(Route, { path: "signup", element: _jsx(SignUp, {}) })] }) }) }));
};
//Sign Up Page Tests
describe("Sign Up Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test("Render SignUp Page", () => {
        render(_jsx(SignUpTestComponent, {}));
        const SignUpHeading = screen.getByRole("heading", {
            name: /sign up to experience the circle/i,
        });
        expect(SignUpHeading).toBeInTheDocument();
    });
    test("Sign Up Inputs are empty when page loads initially", () => {
        const { container } = render(_jsx(SignUpTestComponent, {}));
        const inputElements = screen.queryAllByRole("textbox");
        const PassElement = container.querySelector("#password");
        const confirmPassElement = screen.getByLabelText(/confirm password/i);
        inputElements.forEach((element) => {
            expect(element).toHaveValue("");
        });
        expect(inputElements).toHaveLength(3);
        expect(confirmPassElement).toBeInTheDocument();
        expect(PassElement).toBeInTheDocument();
    });
    test("Submiting form when inputs are empty shows errors", async () => {
        render(_jsx(SignUpTestComponent, {}));
        const submitBtn = screen.getByRole("button", { name: /register/i });
        await userEvent.click(submitBtn);
        const emailErr = screen.getByText(/please enter valid email address/i);
        expect(emailErr).toBeInTheDocument();
        const lastNameErr = screen.getByText(/last name should be more than 3 letters/i);
        expect(lastNameErr).toBeInTheDocument();
        const firstNameErr = screen.getByText(/first name should be more than 3 letters/i);
        expect(firstNameErr).toBeInTheDocument();
    });
    test("when user enter details into form", async () => {
        render(_jsx(SignUpTestComponent, {}));
        const inputElements = screen.queryAllByRole("textbox");
        for (let input of inputElements) {
            await userEvent.type(input, "Megh");
            expect(input).toHaveValue("Megh");
        }
        const passwordInput = screen.getByPlaceholderText(/Please Enter Your password/i);
        await userEvent.type(passwordInput, "Megh@123");
        expect(passwordInput).toHaveValue("Megh@123");
        const confirmPasswordInput = screen.getByPlaceholderText(/Please Enter Your ConfirmPassword/i);
        await userEvent.type(confirmPasswordInput, "Megh@123");
        expect(confirmPasswordInput).toHaveValue("Megh@123");
    });
    test("when user click for Login page button", async () => {
        render(_jsx(SignUpTestComponent, {}));
        // console.log(screen.debug());
        const LoginPageButton = screen.getByRole("link", {
            name: /Already Registered/i,
        });
        await userEvent.click(LoginPageButton);
        const signUpElement = await screen.findByText(/Login/i);
        expect(signUpElement).toBeInTheDocument();
    });
    test("When User Clicks SignUp Button without proper inputs", async () => {
        render(_jsx(SignUpTestComponent, {}));
        const SignUpButton = screen.getByRole("button", { name: /register/i });
        expect(SignUpButton).toBeInTheDocument();
        const firstName = screen.getByPlaceholderText(/Please Enter Your First Name/i);
        const lastName = screen.getByLabelText(/Last Name/i);
        const email = screen.getByRole("textbox", { name: /email/i });
        const passwordInput = screen.getByPlaceholderText(/Please Enter Your password/i);
        const confirmPasswordInput = screen.getByPlaceholderText(/Please Enter Your ConfirmPassword/i);
        await userEvent.type(firstName, "Me");
        await userEvent.type(lastName, "pa");
        await userEvent.type(email, "Megh");
        await userEvent.type(passwordInput, "Megh1");
        await userEvent.type(confirmPasswordInput, "Meg");
        waitFor(async () => {
            await userEvent.click(SignUpButton);
            expect(SignUpMock).not.toHaveBeenCalled();
        });
    });
    test("When User Clicks SignUp Button and SignUp Request is sent", async () => {
        render(_jsx(SignUpTestComponent, {}));
        const SignUpButton = screen.getByRole("button", { name: /register/i });
        expect(SignUpButton).toBeInTheDocument();
        const firstName = screen.getByPlaceholderText(/Please Enter Your First Name/i);
        const lastName = screen.getByLabelText(/Last Name/i);
        const email = screen.getByRole("textbox", { name: /email/i });
        const passwordInput = screen.getByPlaceholderText(/Please Enter Your password/i);
        const confirmPasswordInput = screen.getByPlaceholderText(/Please Enter Your ConfirmPassword/i);
        await userEvent.type(firstName, "Megh");
        await userEvent.type(lastName, "Patel");
        await userEvent.type(email, "megh@gmail.com");
        await userEvent.type(passwordInput, "Megh@123");
        await userEvent.type(confirmPasswordInput, "Megh@123");
        expect(firstName).toHaveValue("Megh");
        expect(lastName).toHaveValue("Patel");
        expect(email).toHaveValue("megh@gmail.com");
        expect(passwordInput).toHaveValue("Megh@123");
        expect(confirmPasswordInput).toHaveValue("Megh@123");
        await waitFor(async () => {
            await userEvent.click(SignUpButton);
            expect(SignUpMock).toHaveBeenCalled();
            const navLink = screen.getByText("Already Registered?");
            expect(navLink).toBeInTheDocument();
            expect(navLink).toHaveAttribute("href", "/auth/login");
        });
        // expect(res).toEqual({
        // 	id: 1,
        // 	username: "Megh",
        // 	message: "SignUp Successfully",
        // });
    });
    test("password visibility test for sign up page", async () => {
        const { container } = render(_jsx(SignUpTestComponent, {}));
        const eyeButtonPassword = container.querySelector(".auth-form__password:nth-child(5) button");
        const eyeButtonConfirmPassword = container.querySelector(".auth-form__password:nth-child(6) button");
        const passwordInput = screen.getByPlaceholderText(/please enter your password/i);
        const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
        expect(passwordInput).toHaveAttribute("type", "password");
        await userEvent.click(eyeButtonPassword);
        expect(passwordInput).toHaveAttribute("type", "text");
        await userEvent.click(eyeButtonPassword);
        expect(passwordInput).toHaveAttribute("type", "password");
        expect(confirmPasswordInput).toHaveAttribute("type", "password");
        await userEvent.click(eyeButtonConfirmPassword);
        expect(confirmPasswordInput).toHaveAttribute("type", "text");
        await userEvent.click(eyeButtonConfirmPassword);
        expect(confirmPasswordInput).toHaveAttribute("type", "password");
    });
});
