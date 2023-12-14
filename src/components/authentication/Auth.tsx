import { Outlet } from "react-router-dom";

const Auth = () => {
	return (
		<div className="auth-page">
			<div className="auth-container">
				<div className="auth-logo">
					<img
						src="/images/circle-logo.png"
						alt="logo image"
						className="auth-logo__img"
					/>
				</div>
				<Outlet />
			</div>
		</div>
	);
};

export default Auth;
