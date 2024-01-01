import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
const Auth = () => {
    return (_jsx("div", { className: "auth-page", children: _jsxs("div", { className: "auth-container", children: [_jsx("div", { className: "auth-logo", children: _jsx("img", { src: "/images/circle-logo.png", alt: "logo image", className: "auth-logo__img" }) }), _jsx(Outlet, {})] }) }));
};
export default Auth;
