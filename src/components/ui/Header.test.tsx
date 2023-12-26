import { MemoryRouter, Navigate, Route, Routes } from "react-router-dom";
import { act, render, screen } from "../../test-utils";
import Header from "./Header";
import userEvent from "@testing-library/user-event";
import Auth from "../authentication/Auth";
import LoginForm from "../authentication/LoginForm";
import SignUp from "../authentication/SignUpForm";
import ProtectedRoute from "../authentication/ProtectedRoute";
import MainApp from "../main-app/MainApp";
import Cart from "../cart/CartPage";
import Profile from "../profile/Profile";
import PageNotFound from "./PageNotFound";
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

const AppTestComponent = ({ initialEntry }: { initialEntry: string }) => {
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
					<Route path="/profile" element={<Profile />} />
				</Route>
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</MemoryRouter>
	);
};

describe("Header Test Cases", () => {
	test("Testing if header elements are getting rendered correctly", async () => {
		render(
			<MemoryRouter>
				<Header />
			</MemoryRouter>
		);

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
			await render(<AppTestComponent initialEntry="/app" />);
		});

		//checking for cart link
		const cartLinks = screen.getAllByRole("link", { name: /cart/i });
		for (let link of cartLinks) {
			await userEvent.click(link);
		}
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
