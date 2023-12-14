import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/authentication/LoginForm";
import SignUp from "./components/authentication/SignUpForm";
import Auth from "./components/authentication/Auth";
import CartPage from "./components/cart/CartPage";
import PageNotFound from "./components/ui/PageNotFound";
import MainApp from "./components/main-app/MainApp";
import Profile from "./components/profile/Profile";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Navigate replace to="/auth" />} />
				<Route path="/auth" element={<Auth />}>
					<Route index element={<Navigate replace to="login" />} />
					<Route path="login" element={<Login />} />
					<Route path="signup" element={<SignUp />} />
				</Route>
				<Route path="/app" element={<MainApp />} />
				<Route path="/cart" element={<CartPage />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
