import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Auth from "../components/authentication/Auth";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "../components/authentication/LoginForm";
import SignUp from "../components/authentication/SignUpForm";
import * as apiServices from "../services/apiServices";
const SignUpMock = jest.spyOn(apiServices, "signUpRequest");

const SignUpTestComponent = () => {
	return (
		<MemoryRouter initialEntries={["/auth/signup"]}>
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

//Sign Up Page Tests

describe("Sign Up Tests", () => {
	test("Render SignUp Page", () => {
		render(<SignUpTestComponent />);
		const SignUpHeading = screen.getByRole("heading", {
			name: /sign up to experience the circle/i,
		});
		expect(SignUpHeading).toBeInTheDocument();
	});

	test("Sign Up Inputs are empty when page loads initially", () => {
		const { container } = render(<SignUpTestComponent />);
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
		render(<SignUpTestComponent />);

		const submitBtn = screen.getByRole("button", { name: /register/i });
		await userEvent.click(submitBtn);

		const emailErr = screen.getByText(/please enter valid email address/i);
		expect(emailErr).toBeInTheDocument();

		const lastNameErr = screen.getByText(
			/last name should be more than 3 letters/i
		);
		expect(lastNameErr).toBeInTheDocument();

		const firstNameErr = screen.getByText(
			/first name should be more than 3 letters/i
		);
		expect(firstNameErr).toBeInTheDocument();
	});

	test("when user enter details into form", async () => {
		render(<SignUpTestComponent />);
		const inputElements = screen.queryAllByRole("textbox");
		inputElements.forEach((element) => {
			fireEvent.change(element, { target: { value: "Knight" } });
		});
		inputElements.forEach((element) => {
			expect(element).toHaveValue("Knight");
		});
	});

	test("when user click for Login page button", async () => {
		render(<SignUpTestComponent />);

		// console.log(screen.debug());

		const LoginPageButton = screen.getByRole("link", {
			name: /Already Registered/i,
		});

		await userEvent.click(LoginPageButton);

		const signUpElement = await screen.findByText(/Login/i);
		expect(signUpElement).toBeInTheDocument();
	});

	test("When User Clicks SignUp Button", async () => {
		render(<SignUpTestComponent />);
		const SignUpButton = screen.getByRole("button", { name: /register/i });
		expect(SignUpButton).toBeInTheDocument();
		waitFor(async () => {
			await userEvent.click(SignUpButton);
			expect(SignUpMock).toHaveBeenCalled();
		});
	});

	test("When User Clicks SignUp Button and SignUp Request is sent", async () => {
		render(<SignUpTestComponent />);
		const SignUpButton = screen.getByRole("button", { name: /register/i });
		expect(SignUpButton).toBeInTheDocument();

		const mockCredentials = {
			firstName: "Megh",
			lastName: "Patel",
			email: "megh@gmail.com",
			password: "Megh@123",
		};

		const res = await apiServices.signUpRequest(mockCredentials);

		expect(res).toEqual({
			id: 1,
			username: "Megh",
			message: "SignUp Successfully",
		});
	});
});
