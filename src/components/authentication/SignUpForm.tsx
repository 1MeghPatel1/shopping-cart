import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, FormValues } from "./formSchema";
import { userSignUp, signUpRequest } from "../../services/apiServices";
import toast from "react-hot-toast";

const SignUp = () => {
	//react hook form
	const [isDisabled, setIsDisabled] = useState(false);
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(schema),
		mode: "onSubmit",
	});

	//Submiting Form

	const onSubmit = (formData: FormValues) => {
		setIsDisabled(true);

		const data: userSignUp = {
			firstName: formData.firstName,
			lastName: formData.lastName,
			email: formData.email,
			password: formData.password,
		};

		type signUpRequestReturnType = Awaited<ReturnType<typeof signUpRequest>>;
		signUpRequest(data)
			.then((res: signUpRequestReturnType) => {
				if (!res.success) {
					toast.error(res.message);
					return;
				}
				navigate("/auth/login");
				toast.success(res.message);
			})
			.finally(() => {
				setIsDisabled(false);
			});
	};

	//for password visibility

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
		useState(false);

	const handleEyeClick = async (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();

		const formgroup = e.currentTarget.closest(
			".auth-form__group"
		) as HTMLElement;
		const input = formgroup.querySelector("input") as HTMLInputElement;

		if (input.id === "password") {
			setIsPasswordVisible((prev) => !prev);
		} else if (input.id === "confirmPassword") {
			setIsConfirmPasswordVisible((prev) => !prev);
		}
	};

	return (
		<form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
			<h2 className="auth-form__heading">
				Sign Up <span>to experience the circle</span>
			</h2>
			<div className="auth-form__group">
				<label htmlFor="firstName" className="auth-form__label">
					First Name
				</label>
				<input
					type="text"
					id="firstName"
					className="auth-form__input"
					placeholder="Please Enter Your First Name"
					{...register("firstName")}
				/>
				<span className="auth-form__error">
					{errors.firstName && `${errors.firstName.message}`}
				</span>
			</div>
			<div className="auth-form__group">
				<label htmlFor="lastName" className="auth-form__label">
					Last Name
				</label>
				<input
					type="text"
					id="lastName"
					className="auth-form__input"
					placeholder="Please Enter Your Last Name"
					{...register("lastName")}
				/>
				<span className="auth-form__error">
					{errors.lastName && `${errors.lastName.message}`}
				</span>
			</div>
			<div className="auth-form__group">
				<label htmlFor="email" className="auth-form__label">
					Email
				</label>
				<input
					type="text"
					id="email"
					className="auth-form__input"
					placeholder="Please Enter Your Email Address"
					{...register("email")}
				/>
				<span className="auth-form__error">
					{errors.email && `${errors.email.message}`}
				</span>
			</div>
			<div className="auth-form__group auth-form__password">
				<label htmlFor="password" className="auth-form__label">
					Password
				</label>
				<input
					type={isPasswordVisible ? "text" : "password"}
					id="password"
					className="auth-form__input"
					placeholder="Please Enter Your Password"
					{...register("password")}
				/>
				<button onClick={handleEyeClick}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="16"
						width="18"
						viewBox="0 0 576 512"
						stroke="red"
					>
						<path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
					</svg>
				</button>
				<span className="auth-form__error">
					{errors.password && `${errors.password.message}`}
				</span>
			</div>

			<div className="auth-form__group auth-form__password">
				<label htmlFor="confirmPassword" className="auth-form__label">
					Confirm Password
				</label>
				<input
					type={isConfirmPasswordVisible ? "text" : "password"}
					id="confirmPassword"
					className="auth-form__input"
					placeholder="Please Enter Your ConfirmPassword"
					{...register("confirmPassword")}
				/>
				<button onClick={handleEyeClick}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="16"
						width="18"
						viewBox="0 0 576 512"
						stroke="red"
					>
						<path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
					</svg>
				</button>
				<span className="auth-form__error">
					{errors.confirmPassword && `${errors.confirmPassword.message}`}
				</span>
			</div>

			<div className="auth-form__btns">
				<NavLink
					to={isDisabled ? "" : "/auth/login"}
					className="nav-link btn--tertiary"
				>
					Already Registered?
				</NavLink>
				<button disabled={isDisabled} type="submit" className="btn--secondary">
					Register
				</button>
			</div>
		</form>
	);
};

export default SignUp;
