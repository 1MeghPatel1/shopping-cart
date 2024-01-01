import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/helper";
const CartOverview = () => {
    const cartState = useSelector((store) => store.cart);
    return (_jsxs("div", { className: `cart-overview sticky-bottom ${cartState.totalProducts > 0 ? "" : "hide"}`, children: [_jsxs("div", { className: "cart-overview__details", children: [_jsxs("h3", { className: "cart-overview__text", children: ["Total Products", _jsx("span", { className: "cart-overview__sub-text", children: " in the cart" }), " :", " ", cartState.totalProducts] }), _jsxs("h3", { className: "cart-overview__text", children: ["Total Price : ", formatCurrency(cartState.totalPrice)] })] }), _jsx(Link, { to: "/cart", className: "btn--secondary", children: "View Cart" })] }));
};
export default CartOverview;
