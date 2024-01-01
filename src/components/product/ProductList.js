import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import ProductModal from "./ProductModal";
import { useSelector } from "react-redux";
const ProductList = ({ currentItems }) => {
    //limiting button or api call if one is already going on
    const [isDisabled, setIsDisabled] = useState(false);
    const [openItem, setOpenItem] = useState(null);
    const cart = useSelector((store) => store.cart.cart);
    //useeffect for Moadal window operations
    useEffect(() => {
        const handleProductClick = (e) => {
            const productItem = e.target.closest(".products__item");
            if (!productItem)
                return;
            if (e.target?.closest("button")?.classList?.value === "btn--primary-2" ||
                e.target?.classList?.value === "btn--secondary-2") {
                return;
            }
            const id = Number(productItem.dataset.productId);
            setOpenItem(id);
        };
        const productList = document.querySelector(".products__list");
        productList.addEventListener("click", handleProductClick);
        // return productList.removeEventListener("click", handleProductClick);
    }, []);
    return (_jsxs("div", { className: "products__list", children: [currentItems.map((product) => {
                const cartProduct = cart.find((item) => item.id === product.id);
                return (_jsx(ProductItem, { category: product.category, image: product.image, name: product.name, price: product.price, qty: cartProduct ? cartProduct.quantity : 0, id: product.id, isDisabled: isDisabled, setIsDisabled: setIsDisabled }, product.id));
            }), _jsx(ProductModal, { isDisabled: isDisabled, setIsDisabled: setIsDisabled, id: openItem, setOpenItem: setOpenItem })] }));
};
export default ProductList;
