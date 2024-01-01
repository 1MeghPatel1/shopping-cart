import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Header from "../ui/Header";
import Hero from "./Hero";
import ProductSection from "../product/ProductSection";
import CartOverview from "../product/CartOverview";
import { useEffect, useState } from "react";
import { getCart } from "../../services/apiServices";
import { useDispatch } from "react-redux";
import { assignCart } from "../../slices/cartSlice";
const MainApp = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    function handleResize() {
        setWindowWidth(window.innerWidth);
    }
    const dispatch = useDispatch();
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    useEffect(() => {
        const header = document.querySelector(".header");
        const products = document.querySelector(".products");
        const searchContainer = document.querySelector(".products__search-container");
        const stickyNav = function (entries) {
            const [entry] = entries;
            if (!entry.isIntersecting) {
                header.classList.add("sticky");
                searchContainer.classList.remove("sticky");
            }
            else {
                header.classList.remove("sticky");
                searchContainer.classList.add("sticky");
            }
        };
        const productsObserver = new IntersectionObserver(stickyNav, {
            root: null,
            threshold: windowWidth < 900 ? (windowWidth < 700 ? 0.22 : 0.4) : 0.43,
        });
        productsObserver.observe(products);
        return () => {
            productsObserver.disconnect();
        };
    }, [windowWidth]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await getCart();
                dispatch(assignCart(res.data));
            }
            catch (err) {
                console.log(err);
            }
        };
        fetchProducts();
    }, [dispatch]);
    return (_jsxs("div", { children: [_jsx(Header, {}), _jsxs("main", { children: [_jsx(Hero, {}), _jsx(ProductSection, {})] }), _jsx(CartOverview, {})] }));
};
export default MainApp;
