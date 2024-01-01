import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MemoryRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "../components/authentication/Auth";
import LoginForm from "../components/authentication/LoginForm";
import SignUp from "../components/authentication/SignUpForm";
import { fireEvent, render, screen, waitFor } from "../test-utils";
import userEvent from "@testing-library/user-event";
import * as apiServices from "../services/apiServices";
const LoginFormTestComponent = () => {
    return (_jsx(MemoryRouter, { initialEntries: ["/auth"], children: _jsx(Routes, { children: _jsxs(Route, { path: "/auth", element: _jsx(Auth, {}), children: [_jsx(Route, { index: true, element: _jsx(Navigate, { replace: true, to: "login" }) }), _jsx(Route, { path: "login", element: _jsx(LoginForm, {}) }), _jsx(Route, { path: "signup", element: _jsx(SignUp, {}) })] }) }) }));
};
const loginMock = jest.spyOn(apiServices, "logInRequest");
describe("login-tests", () => {
    test("render auth", () => {
        render(_jsx(Auth, {}));
    });
    test("render input elements", () => {
        render(_jsx(LoginFormTestComponent, {}));
        const inputElements = screen.queryAllByRole("textbox");
        const passwordElement = screen.getByLabelText(/password/i);
        expect(inputElements).toHaveLength(1);
        expect(passwordElement).toBeInTheDocument();
    });
    test("input elements should be empty", () => {
        render(_jsx(LoginFormTestComponent, {}));
        const inputElements = screen.queryAllByRole("textbox");
        const passwordElement = screen.getByLabelText(/password/i);
        inputElements.forEach((element) => {
            expect(element).toHaveValue("");
        });
        expect(passwordElement).toHaveValue("");
    });
    test("when user enter details into form", async () => {
        render(_jsx(LoginFormTestComponent, {}));
        const inputElements = screen.queryAllByRole("textbox");
        const passwordElement = screen.getByLabelText(/password/i);
        inputElements.forEach((element) => {
            fireEvent.change(element, { target: { value: "Knight" } });
        });
        inputElements.forEach((element) => {
            expect(element).toHaveValue("Knight");
        });
        await userEvent.type(passwordElement, "Megh@123");
        expect(passwordElement).toHaveValue("Megh@123");
    });
    test("when user click for sign up page button", async () => {
        render(_jsx(LoginFormTestComponent, {}));
        // console.log(screen.debug());
        const signUpButton = screen.getByRole("link", {
            name: /new here\? let's get you started/i,
        });
        expect(signUpButton).toBeInTheDocument();
        expect(signUpButton).toHaveAttribute("href", "/auth/signup");
        await userEvent.click(signUpButton);
        const signUpElement = await screen.findByText(/Sign Up/i);
        expect(signUpElement).toBeInTheDocument();
    });
    test("When User Clicks Login Button and storing userInformation into localStorage", async () => {
        render(_jsx(LoginFormTestComponent, {}));
        const inputElement = screen.getByRole("textbox");
        const passwordElement = screen.getByLabelText(/password/i);
        await userEvent.type(inputElement, "megh@gmail.com");
        await userEvent.type(passwordElement, "Megh@123");
        const logInButton = screen.getByRole("button", {
            name: /Log in/i,
        });
        expect(logInButton).toBeInTheDocument();
        await waitFor(async () => {
            await userEvent.click(logInButton);
            expect(loginMock).toHaveBeenCalled();
        });
        expect(localStorage.setItem).toHaveBeenCalledWith("userInfo", JSON.stringify({
            id: 1,
            firstName: "Megh",
            lastName: "Patel",
            email: "megh@gmail.com",
            refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjozMywiZmlyc3ROYW1lIjoiTWVnaCIsImxhc3ROYW1lIjoiUGF0ZWwiLCJlbWFpbCI6Im1lZ2hwYXRlbEBnbWFpbC5jb20ifSwiaWF0IjoxNzAzMjUzMjk0LCJle",
            accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7I…wOTR9.CkWyQL2gHJfBiKqye8fOnWLREEmhGz2e9OQzVzgDsp4",
        }));
    });
    test("Reject Login Request and throw error", async () => {
        jest.clearAllMocks();
        render(_jsx(LoginFormTestComponent, {}));
        const logInButton = screen.getByRole("button", {
            name: /Log in/i,
        });
        expect(logInButton).toBeInTheDocument();
        await waitFor(async () => {
            await userEvent.click(logInButton);
            expect(loginMock).toHaveBeenCalled();
        });
        expect(localStorage.setItem).not.toHaveBeenCalledWith("userInfo", JSON.stringify({
            id: 1,
            firstName: "Megh",
            lastName: "Patel",
            email: "megh@gmail.com",
            refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjozMywiZmlyc3ROYW1lIjoiTWVnaCIsImxhc3ROYW1lIjoiUGF0ZWwiLCJlbWFpbCI6Im1lZ2hwYXRlbEBnbWFpbC5jb20ifSwiaWF0IjoxNzAzMjUzMjk0LCJle",
            accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7I…wOTR9.CkWyQL2gHJfBiKqye8fOnWLREEmhGz2e9OQzVzgDsp4",
        }));
        jest.restoreAllMocks();
    });
    test("When User Clicks Login Button and Login Request is sent", async () => {
        render(_jsx(LoginFormTestComponent, {}));
        const logInButton = screen.getByRole("button", {
            name: /Log in/i,
        });
        expect(logInButton).toBeInTheDocument();
        const mockCredentials = {
            email: "megh@gmail.com",
            password: "Megh@123",
        };
        await waitFor(async () => {
            const res = await apiServices.logInRequest(mockCredentials);
            expect(res).toEqual({
                success: true,
                data: {
                    id: 1,
                    firstName: "Megh",
                    lastName: "Patel",
                    email: "megh@gmail.com",
                    refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjozMywiZmlyc3ROYW1lIjoiTWVnaCIsImxhc3ROYW1lIjoiUGF0ZWwiLCJlbWFpbCI6Im1lZ2hwYXRlbEBnbWFpbC5jb20ifSwiaWF0IjoxNzAzMjUzMjk0LCJle",
                    accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7I…wOTR9.CkWyQL2gHJfBiKqye8fOnWLREEmhGz2e9OQzVzgDsp4",
                },
            });
        });
    });
    test("password visibility test for Login page", async () => {
        const { container } = render(_jsx(LoginFormTestComponent, {}));
        const eyeButton = container.querySelector(".auth-form__group button");
        const passwordInput = screen.getByLabelText(/password/i);
        await userEvent.click(eyeButton);
        expect(passwordInput).toHaveAttribute("type", "text");
        await userEvent.click(eyeButton);
    });
});
