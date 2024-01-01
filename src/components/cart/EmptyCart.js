import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
function EmptyCart() {
    return (_jsx("div", { className: "cart__empty-cart-page", children: _jsxs("div", { className: "cart__empty-cart", children: [_jsx(Link, { className: "nav-link btn--primary", to: "/app", children: "\u2190 Back to Home" }), _jsx("p", { className: "cart__empty-cart-text", children: "Your cart is still empty. Start adding some Products :)" })] }) }));
}
export default EmptyCart;
