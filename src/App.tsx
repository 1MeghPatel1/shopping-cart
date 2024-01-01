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
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route index path="/" element={<Navigate replace to="/app" />} />
					<Route path="/auth" element={<Auth />}>
						<Route index element={<Navigate replace to="login" />} />
						<Route path="login" element={<Login />} />
						<Route path="signup" element={<SignUp />} />
					</Route>
					<Route element={<ProtectedRoute />}>
						<Route path="/app" element={<MainApp />} />
						<Route path="/cart" element={<CartPage />} />
						<Route path="/profile" element={<Profile />} />
					</Route>
					<Route path="*" element={<PageNotFound />} />
				</Routes>
				<Toaster
					position="top-center"
					gutter={8}
					toastOptions={{
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
					}}
				/>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
