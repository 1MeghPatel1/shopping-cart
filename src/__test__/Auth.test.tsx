import { MemoryRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "../components/authentication/Auth";
import LoginForm from "../components/authentication/LoginForm";
import SignUp from "../components/authentication/SignUpForm";
import { render, screen } from "../test-utils";
import userEvent from "@testing-library/user-event";

// import { mockLocalStorage } from "../../mocks/mockLocalStorage";
// const { setItemMock } = mockLocalStorage();

const AuthFormTestComponent = ({ initialEntry }: { initialEntry: string }) => {
	return (
		<MemoryRouter initialEntries={[initialEntry]}>
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
		const { container } = render(
			<AuthFormTestComponent initialEntry="/auth" />
		);
		const eyeButton = container.querySelector(
			".auth-form__group button"
		) as HTMLButtonElement;

		const passwordInput = screen.getByLabelText(/password/i);
		await userEvent.click(eyeButton);
		expect(passwordInput).toHaveAttribute("type", "text");
		await userEvent.click(eyeButton);
	});

	test("password visibility test for sign up page", async () => {
		const { container } = render(
			<AuthFormTestComponent initialEntry="/auth/signup" />
		);
		const eyeButtonPassword = container.querySelector(
			".auth-form__password:nth-child(5) button"
		) as HTMLButtonElement;
		const eyeButtonConfirmPassword = container.querySelector(
			".auth-form__password:nth-child(6) button"
		) as HTMLButtonElement;

		const passwordInput = screen.getByPlaceholderText(
			/please enter your password/i
		);
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
