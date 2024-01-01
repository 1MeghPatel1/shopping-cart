import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoute = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
        const { accessToken, email } = userInfo;
        return accessToken !== "" && email !== "" ? (_jsx(Outlet, {})) : (_jsx(Navigate, { to: "/auth/login" }));
    }
    else {
        return _jsx(Navigate, { to: "/auth/login" });
    }
};
export default ProtectedRoute;
