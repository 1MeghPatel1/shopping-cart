import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MemoryRouter, Navigate, Route, Routes } from "react-router-dom";
import MainApp from "../components/main-app/MainApp";
import Cart from "../components/cart/CartPage";
import { act, render, screen } from "../test-utils";
import ProtectedRoute from "../components/authentication/ProtectedRoute";
import Auth from "../components/authentication/Auth";
import LoginForm from "../components/authentication/LoginForm";
import SignUp from "../components/authentication/SignUpForm";
// import { mockLocalStorage } from "../../mocks/mockLocalStorage";
// const { getItemMock } = mockLocalStorage();
// const userInfo = {
// 	id: 1,
// 	firstName: "Megh",
// 	lastName: "Patel",
// 	email: "megh@gmail.com",
// 	refreshToken:
// 		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjozMywiZmlyc3ROYW1lIjoiTWVnaCIsImxhc3ROYW1lIjoiUGF0ZWwiLCJlbWFpbCI6Im1lZ2hwYXRlbEBnbWFpbC5jb20ifSwiaWF0IjoxNzAzMjUzMjk0LCJle",
// 	accessToken:
// 		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7I…wOTR9.CkWyQL2gHJfBiKqye8fOnWLREEmhGz2e9OQzVzgDsp4",
// };
const ProtectedRouteTestComponent = ({ initialEntry, }) => {
    return (_jsx(MemoryRouter, { initialEntries: [initialEntry], children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Navigate, { replace: true, to: "/auth" }) }), _jsxs(Route, { path: "/auth", element: _jsx(Auth, {}), children: [_jsx(Route, { index: true, element: _jsx(Navigate, { replace: true, to: "login" }) }), _jsx(Route, { path: "login", element: _jsx(LoginForm, {}) }), _jsx(Route, { path: "signup", element: _jsx(SignUp, {}) })] }), _jsxs(Route, { element: _jsx(ProtectedRoute, {}), children: [_jsx(Route, { path: "/app", element: _jsx(MainApp, {}) }), _jsx(Route, { path: "/cart", element: _jsx(Cart, {}) })] })] }) }));
};
//Protected Route Tests
describe("Protected Route Tests for App", () => {
    test("Testing if User is Authenticated or Not for Main App Page", async () => {
        // getItemMock.mockReturnValue(JSON.stringify(userInfo));
        await act(async () => {
            await render(_jsx(ProtectedRouteTestComponent, { initialEntry: "/app" }));
        });
        const homePageHeading = screen.getByRole("heading", {
            name: /premium luxury products at your finger tips!/i,
        });
        expect(homePageHeading).toBeInTheDocument();
    });
    test("testing if cart page is rendered or not when user is Authenticated", async () => {
        // getItemMock.mockReturnValue(JSON.stringify(userInfo));
        await act(async () => {
            await render(_jsx(ProtectedRouteTestComponent, { initialEntry: "/cart" }));
        });
        const cartHeading = screen.getByRole("heading", {
            name: /your cart, megh/i,
        });
        expect(cartHeading).toBeInTheDocument();
    });
    test("Testing if User is Not Authenticated and does it redirects to login", async () => {
        localStorage.removeItem("userInfo");
        await act(async () => {
            await render(_jsx(ProtectedRouteTestComponent, { initialEntry: "/app" }));
        });
        const homePageHeading = screen.queryByRole("heading", {
            name: /premium luxury products at your finger tips!/i,
        });
        expect(homePageHeading).not.toBeInTheDocument();
        const loginElement = await screen.findByText(/Login/i);
        expect(loginElement).toBeInTheDocument();
    });
    test("Testing if UserIfo is in Local Storage but it doesn't have accessToken", async () => {
        localStorage.setItem("userInfo", JSON.stringify({
            id: 1,
            firstName: "Megh",
            lastName: "Patel",
            email: "",
            refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjozMywiZmlyc3ROYW1lIjoiTWVnaCIsImxhc3ROYW1lIjoiUGF0ZWwiLCJlbWFpbCI6Im1lZ2hwYXRlbEBnbWFpbC5jb20ifSwiaWF0IjoxNzAzMjUzMjk0LCJle",
            accessToken: "",
        }));
        await act(async () => {
            await render(_jsx(ProtectedRouteTestComponent, { initialEntry: "/app" }));
        });
        const homePageHeading = screen.queryByRole("heading", {
            name: /premium luxury products at your finger tips!/i,
        });
        expect(homePageHeading).not.toBeInTheDocument();
        const loginElement = await screen.findByText(/Login/i);
        expect(loginElement).toBeInTheDocument();
    });
});
