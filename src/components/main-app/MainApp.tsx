import Header from "../ui/Header";
import Hero from "./Hero";
import ProductSection from "../product/ProductSection";
import CartOverview from "../product/CartOverview";
import { useEffect, useState } from "react";

const MainApp = () => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	function handleResize() {
		setWindowWidth(window.innerWidth);
	}

	useEffect(() => {
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		const header = document.querySelector(".header") as HTMLHeadElement;
		const products = document.querySelector(".products") as HTMLElement;
		const searchContainer = document.querySelector(
			".products__search-container"
		) as HTMLElement;

		const stickyNav: IntersectionObserverCallback = function (entries) {
			const [entry] = entries;

			if (!entry.isIntersecting) {
				header.classList.add("sticky");
				searchContainer.classList.remove("sticky");
			} else {
				header.classList.remove("sticky");
				searchContainer.classList.add("sticky");
			}
		};

		const productsObserver = new IntersectionObserver(stickyNav, {
			root: null,
			threshold: windowWidth < 900 ? (windowWidth < 700 ? 0.22 : 0.4) : 0.5,
		});

		productsObserver.observe(products);

		return () => {
			productsObserver.disconnect();
		};
	}, [windowWidth]);

	// useEffect(() => {
	// 	const fetchProducts = async () => {
	// 		try {
	// 			const res = await shopApiJWT.get("products");
	// 			return res;
	// 		} catch (err) {
	// 			console.log(err);
	// 		}
	// 	};
	// 	fetchProducts().then((res) => {
	// 		console.log(res);
	// 	});
	// }, []);

	return (
		<div>
			<Header />
			<main>
				<Hero />
				<ProductSection />
			</main>
			<CartOverview />
		</div>
	);
};

export default MainApp;
