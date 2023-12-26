import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
	const navigate = useNavigate();

	const handleLogOut = (e: MouseEvent) => {
		e.preventDefault();
		localStorage.removeItem("userInfo");
		navigate("/auth/login");
		toast.success("Logged Out Successfully");
	};

	return (
		<header className="header sticky">
			<NavLink to="/app" className="header__logo-container">
				<div className="header__logo-box">
					<img
						src="/images/circle-logo-no-bg.png"
						alt="Logo"
						className="header__logo-img"
					/>
				</div>
				<span className="header__logo-text">The Circle</span>
			</NavLink>
			<nav className="header__nav">
				<ul className="header__nav-list">
					<NavLink to="/app" className="header__nav-item">
						<span className="header__nav-link">Home</span>
					</NavLink>

					<NavLink to="/cart" className="header__nav-item">
						<span className="header__nav-link">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="16"
								width="18"
								viewBox="0 0 576 512"
							>
								<path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
							</svg>
							Cart
						</span>
					</NavLink>
					<NavLink to="/" className="header__nav-item">
						<span className="header__nav-link">Your Profile</span>
					</NavLink>
					<button onClick={handleLogOut} className="header__nav-item">
						<a href="" className="header__nav-link">
							Log-out
						</a>
					</button>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
