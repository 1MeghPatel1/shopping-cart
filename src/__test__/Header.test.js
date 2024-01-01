import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MemoryRouter, Navigate, Route, Routes } from "react-router-dom";
import { act, render, screen } from "../test-utils";
import Header from "../components/ui/Header";
import userEvent from "@testing-library/user-event";
import Auth from "../components/authentication/Auth";
import LoginForm from "../components/authentication/LoginForm";
import SignUp from "../components/authentication/SignUpForm";
import ProtectedRoute from "../components/authentication/ProtectedRoute";
import MainApp from "../components/main-app/MainApp";
import Cart from "../components/cart/CartPage";
import Profile from "../components/profile/Profile";
import PageNotFound from "../components/ui/PageNotFound";
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
const AppTestComponent = ({ initialEntry }) => {
    return (_jsx(MemoryRouter, { initialEntries: [initialEntry], children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Navigate, { replace: true, to: "/auth" }) }), _jsxs(Route, { path: "/auth", element: _jsx(Auth, {}), children: [_jsx(Route, { index: true, element: _jsx(Navigate, { replace: true, to: "login" }) }), _jsx(Route, { path: "login", element: _jsx(LoginForm, {}) }), _jsx(Route, { path: "signup", element: _jsx(SignUp, {}) })] }), _jsxs(Route, { element: _jsx(ProtectedRoute, {}), children: [_jsx(Route, { path: "/app", element: _jsx(MainApp, {}) }), _jsx(Route, { path: "/cart", element: _jsx(Cart, {}) }), _jsx(Route, { path: "/profile", element: _jsx(Profile, {}) })] }), _jsx(Route, { path: "*", element: _jsx(PageNotFound, {}) })] }) }));
};
describe("Header Test Cases", () => {
    test("Testing if header elements are getting rendered correctly", async () => {
        render(_jsx(MemoryRouter, { children: _jsx(Header, {}) }));
        const headerLogoImageElement = screen.getByRole("img", { name: /logo/i });
        const headerLogoSpanElement = screen.getByText(/the circle/i);
        const headerNavItems = screen.getAllByRole("link");
        expect(headerLogoImageElement).toBeInTheDocument();
        expect(headerLogoSpanElement).toBeInTheDocument();
        expect(headerNavItems).toHaveLength(5);
    });
    test("Navigating across application on click of Nav Items", async () => {
        // getItemMock.mockReturnValue(JSON.stringify(userInfo));
        await act(async () => {
            await render(_jsx(AppTestComponent, { initialEntry: "/app" }));
        });
        //checking for cart link
        const cartLinks = screen.getAllByRole("link", { name: /cart/i });
        // for (let link of cartLinks) {
        // 	await userEvent.click(link);
        // }
        await userEvent.click(cartLinks[0]);
        const cartHeading = screen.queryByRole("heading", {
            level: 2,
            name: /your cart, megh/i,
        });
        expect(cartHeading).toBeInTheDocument();
        //checking for home link
        const homeLink = screen.getByRole("link", { name: /home/i });
        await userEvent.click(homeLink);
        const homeHeading = screen.queryByRole("heading", {
            level: 3,
            name: /Catering to your needs with best in class Customer-Support Services and Customer friendly policies/i,
        });
        expect(homeHeading).toBeInTheDocument();
        //checking for LogOut link
        const logoutLink = screen.getByRole("link", { name: /log\-out/i });
        await userEvent.click(logoutLink);
        const logoutHeading = screen.getByRole("heading", {
            name: /login to explore our products/i,
        });
        expect(logoutHeading).toBeInTheDocument();
    });
});
