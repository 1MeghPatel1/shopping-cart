import { MemoryRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "../components/authentication/Auth";
import LoginForm from "../components/authentication/LoginForm";
import SignUp from "../components/authentication/SignUpForm";
import { render } from "../test-utils";

// import { mockLocalStorage } from "../../mocks/mockLocalStorage";
// const { setItemMock } = mockLocalStorage();

const LoginFormTestComponent = () => {
	return (
		<MemoryRouter initialEntries={["/auth"]}>
			<Routes>
				<Route path="/auth" element={<Auth />}>
					<Route index element={<Navigate replace to="login" />} />
					<Route path="login" element={<LoginForm />} />
					<Route path="signup" element={<SignUp />} />
				</Route>
			</Routes>
		</MemoryRouter>
	);
};

describe("password visibility test for login and sign up pages", () => {
	test("password visibility test for Login page", async () => {
		const { container } = render(<LoginFormTestComponent />);
	});
});
