import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./formSchema";
import { signUpRequest } from "../../services/apiServices";
import toast from "react-hot-toast";
const SignUp = () => {
    //react hook form
    const [isDisabled, setIsDisabled] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: zodResolver(schema),
        mode: "onSubmit",
    });
    //Submiting Form
    const onSubmit = (formData) => {
        setIsDisabled(true);
        const data = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
        };
        signUpRequest(data)
            .then((res) => {
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
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const handleEyeClick = async (e) => {
        e.preventDefault();
        const formgroup = e.currentTarget.closest(".auth-form__group");
        const input = formgroup.querySelector("input");
        if (input.id === "password") {
            setIsPasswordVisible((prev) => !prev);
        }
        else if (input.id === "confirmPassword") {
            setIsConfirmPasswordVisible((prev) => !prev);
        }
    };
    return (_jsxs("form", { className: "auth-form", onSubmit: handleSubmit(onSubmit), children: [_jsxs("h2", { className: "auth-form__heading", children: ["Sign Up ", _jsx("span", { children: "to experience the circle" })] }), _jsxs("div", { className: "auth-form__group", children: [_jsx("label", { htmlFor: "firstName", className: "auth-form__label", children: "First Name" }), _jsx("input", { type: "text", id: "firstName", className: "auth-form__input", placeholder: "Please Enter Your First Name", ...register("firstName") }), _jsx("span", { className: "auth-form__error", children: errors.firstName && `${errors.firstName.message}` })] }), _jsxs("div", { className: "auth-form__group", children: [_jsx("label", { htmlFor: "lastName", className: "auth-form__label", children: "Last Name" }), _jsx("input", { type: "text", id: "lastName", className: "auth-form__input", placeholder: "Please Enter Your Last Name", ...register("lastName") }), _jsx("span", { className: "auth-form__error", children: errors.lastName && `${errors.lastName.message}` })] }), _jsxs("div", { className: "auth-form__group", children: [_jsx("label", { htmlFor: "email", className: "auth-form__label", children: "Email" }), _jsx("input", { type: "text", id: "email", className: "auth-form__input", placeholder: "Please Enter Your Email Address", ...register("email") }), _jsx("span", { className: "auth-form__error", children: errors.email && `${errors.email.message}` })] }), _jsxs("div", { className: "auth-form__group auth-form__password", children: [_jsx("label", { htmlFor: "password", className: "auth-form__label", children: "Password" }), _jsx("input", { type: isPasswordVisible ? "text" : "password", id: "password", className: "auth-form__input", placeholder: "Please Enter Your Password", ...register("password") }), _jsx("button", { onClick: handleEyeClick, children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", height: "16", width: "18", viewBox: "0 0 576 512", stroke: "red", children: _jsx("path", { d: "M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" }) }) }), _jsx("span", { className: "auth-form__error", children: errors.password && `${errors.password.message}` })] }), _jsxs("div", { className: "auth-form__group auth-form__password", children: [_jsx("label", { htmlFor: "confirmPassword", className: "auth-form__label", children: "Confirm Password" }), _jsx("input", { type: isConfirmPasswordVisible ? "text" : "password", id: "confirmPassword", className: "auth-form__input", placeholder: "Please Enter Your ConfirmPassword", ...register("confirmPassword") }), _jsx("button", { onClick: handleEyeClick, children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", height: "16", width: "18", viewBox: "0 0 576 512", stroke: "red", children: _jsx("path", { d: "M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" }) }) }), _jsx("span", { className: "auth-form__error", children: errors.confirmPassword && `${errors.confirmPassword.message}` })] }), _jsxs("div", { className: "auth-form__btns", children: [_jsx(NavLink, { to: isDisabled ? "" : "/auth/login", className: "nav-link btn--tertiary", children: "Already Registered?" }), _jsx("button", { disabled: isDisabled, type: "submit", className: "btn--secondary", children: "Register" })] })] }));
};
export default SignUp;
