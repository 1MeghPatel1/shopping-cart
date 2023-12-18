import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
	const userInfo = JSON.parse(localStorage.getItem("userInfo")!);
	if (userInfo) {
		const { accessToken, email } = userInfo;
		return accessToken !== "" && email !== "" ? (
			<Outlet />
		) : (
			<Navigate to="/auth/login" />
		);
	} else {
		return <Navigate to="/auth/login" />;
	}
};

export default ProtectedRoute;
