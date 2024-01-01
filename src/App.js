import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/authentication/LoginForm";
import SignUp from "./components/authentication/SignUpForm";
import Auth from "./components/authentication/Auth";
import CartPage from "./components/cart/CartPage";
import PageNotFound from "./components/ui/PageNotFound";
import MainApp from "./components/main-app/MainApp";
import Profile from "./components/profile/Profile";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/authentication/ProtectedRoute";
import { Provider } from "react-redux";
import store from "./store";
const App = () => {
    return (_jsx(Provider, { store: store, children: _jsxs(BrowserRouter, { children: [_jsxs(Routes, { children: [_jsx(Route, { index: true, path: "/", element: _jsx(Navigate, { replace: true, to: "/app" }) }), _jsxs(Route, { path: "/auth", element: _jsx(Auth, {}), children: [_jsx(Route, { index: true, element: _jsx(Navigate, { replace: true, to: "login" }) }), _jsx(Route, { path: "login", element: _jsx(Login, {}) }), _jsx(Route, { path: "signup", element: _jsx(SignUp, {}) })] }), _jsxs(Route, { element: _jsx(ProtectedRoute, {}), children: [_jsx(Route, { path: "/app", element: _jsx(MainApp, {}) }), _jsx(Route, { path: "/cart", element: _jsx(CartPage, {}) }), _jsx(Route, { path: "/profile", element: _jsx(Profile, {}) })] }), _jsx(Route, { path: "*", element: _jsx(PageNotFound, {}) })] }), _jsx(Toaster, { position: "top-center", gutter: 8, toastOptions: {
                        // Default options for specific types
                        style: {
                            fontSize: "1.8rem",
                        },
                        success: {
                            duration: 3000,
                        },
                        error: {
                            duration: 5000,
                        },
                    } })] }) }));
};
export default App;
