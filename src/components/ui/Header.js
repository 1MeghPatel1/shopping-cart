import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
const Header = () => {
    const navigate = useNavigate();
    const handleLogOut = (e) => {
        e.preventDefault();
        localStorage.removeItem("userInfo");
        navigate("/auth/login");
        toast.success("Logged Out Successfully");
    };
    return (_jsxs("header", { className: "header sticky", children: [_jsxs(NavLink, { to: "/app", className: "header__logo-container", children: [_jsx("div", { className: "header__logo-box", children: _jsx("img", { src: "/images/circle-logo-no-bg.png", alt: "Logo", className: "header__logo-img" }) }), _jsx("span", { className: "header__logo-text", children: "The Circle" })] }), _jsx("nav", { className: "header__nav", children: _jsxs("ul", { className: "header__nav-list", children: [_jsx(NavLink, { to: "/app", className: "header__nav-item", children: _jsx("span", { className: "header__nav-link", children: "Home" }) }), _jsx(NavLink, { to: "/cart", className: "header__nav-item", children: _jsxs("span", { className: "header__nav-link", children: [_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", height: "16", width: "18", viewBox: "0 0 576 512", children: _jsx("path", { d: "M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" }) }), "Cart"] }) }), _jsx(NavLink, { to: "/profile", className: "header__nav-item", children: _jsx("span", { className: "header__nav-link", children: "Your Profile" }) }), _jsx("button", { onClick: handleLogOut, className: "header__nav-item", children: _jsx("a", { href: "", className: "header__nav-link", children: "Log-out" }) })] }) })] }));
};
export default Header;
