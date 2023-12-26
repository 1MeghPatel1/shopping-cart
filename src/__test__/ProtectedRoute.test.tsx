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

const ProtectedRouteTestComponent = ({
	initialEntry,
}: {
	initialEntry: string;
}) => {
	return (
		<MemoryRouter initialEntries={[initialEntry]}>
			<Routes>
				<Route path="/" element={<Navigate replace to="/auth" />} />
				<Route path="/auth" element={<Auth />}>
					<Route index element={<Navigate replace to="login" />} />
					<Route path="login" element={<LoginForm />} />
					<Route path="signup" element={<SignUp />} />
				</Route>
				<Route element={<ProtectedRoute />}>
					<Route path="/app" element={<MainApp />} />
					<Route path="/cart" element={<Cart />} />
				</Route>
			</Routes>
		</MemoryRouter>
	);
};

//Protected Route Tests

describe("Protected Route Tests for App", () => {
	test("Testing if User is Authenticated or Not for Main App Page", async () => {
		// getItemMock.mockReturnValue(JSON.stringify(userInfo));
		await act(async () => {
			await render(<ProtectedRouteTestComponent initialEntry="/app" />);
		});

		const homePageHeading = screen.getByRole("heading", {
			name: /premium luxury products at your finger tips!/i,
		});
		expect(homePageHeading).toBeInTheDocument();
	});

	test("testing if cart page is rendered or not when user is Authenticated", async () => {
		// getItemMock.mockReturnValue(JSON.stringify(userInfo));
		await act(async () => {
			await render(<ProtectedRouteTestComponent initialEntry="/cart" />);
		});
		const cartHeading = screen.getByRole("heading", {
			name: /your cart, megh/i,
		});
		expect(cartHeading).toBeInTheDocument();
	});
});
