import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { logInRequest } from "../../services/apiServices";
import toast from "react-hot-toast";
const LoginForm = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const navigate = useNavigate();
    const handleEyeClick = async (e) => {
        e.preventDefault();
        setIsPasswordVisible((prev) => !prev);
    };
    //react hook login form
    const { register, handleSubmit } = useForm();
    const onLogin = (data) => {
        setIsDisabled(true);
        logInRequest(data)
            .then(async (res) => {
            if (!res.success) {
                toast.error(res.message);
                return;
            }
            await localStorage.setItem("userInfo", JSON.stringify(res.data));
            navigate("/app");
            toast.success(res.message);
        })
            .finally(() => {
            setIsDisabled(false);
        });
    };
    return (_jsxs("form", { onSubmit: handleSubmit(onLogin), className: "auth-form", children: [_jsxs("h2", { className: "auth-form__heading", children: ["Login ", _jsx("span", { children: "to explore our products" })] }), _jsxs("div", { className: "auth-form__group", children: [_jsx("label", { htmlFor: "email", className: "auth-form__label", children: "Email" }), _jsx("input", { type: "text", id: "email", className: "auth-form__input", placeholder: "Please Enter Your Email Address", ...register("email") })] }), _jsxs("div", { className: "auth-form__group", children: [_jsx("label", { htmlFor: "password", className: "auth-form__label", children: "Password" }), _jsx("input", { type: isPasswordVisible ? "text" : "password", id: "password", className: "auth-form__input", placeholder: "Please Enter Your Password", ...register("password") }), _jsx("button", { onClick: handleEyeClick, children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", height: "16", width: "18", viewBox: "0 0 576 512", stroke: "red", children: _jsx("path", { className: isPasswordVisible ? "password-visible" : "", d: "M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" }) }) })] }), _jsxs("div", { className: "auth-form__btns", children: [_jsx(NavLink, { to: isDisabled ? "" : "/auth/signup", className: "nav-link btn--tertiary", children: "New here? Let's get you started" }), _jsx("button", { disabled: isDisabled, type: "submit", className: "btn--secondary nav-link", children: "Log In" })] })] }));
};
export default LoginForm;
