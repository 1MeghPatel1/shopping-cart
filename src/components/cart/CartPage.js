import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Button from "../ui/Button";
import Header from "../ui/Header";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "./EmptyCart";
import { useEffect, useState } from "react";
import { getCart } from "../../services/apiServices";
import { assignCart } from "../../slices/cartSlice";
import Loading from "../ui/Loading";
function Cart() {
    const [isLoading, setIsLoading] = useState(false);
    const cartState = useSelector((store) => store.cart);
    const [isDisabled, setIsDisabled] = useState(false);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchCart = async () => {
            setIsLoading(true);
            try {
                const res = await getCart();
                if (res.success) {
                    dispatch(assignCart(res.data));
                }
            }
            catch (err) {
                console.log(err);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchCart();
    }, [dispatch]);
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), isLoading && _jsx(Loading, {}), isLoading || (_jsx(_Fragment, { children: cartState.totalProducts === 0 ? (_jsx(EmptyCart, {})) : (_jsxs("div", { className: "cart", children: [_jsxs("h2", { className: "cart__username", children: ["Your cart, ", userInfo.firstName] }), _jsx("ul", { className: "cart__list", children: cartState.cart.map((cartItem) => {
                                return (_jsx(CartItem, { image: cartItem.image, title: cartItem.name, totalPrice: cartItem.totalPrice, quantity: cartItem.quantity, id: cartItem.id, isDisabled: isDisabled, setIsDisabled: setIsDisabled }, cartItem.id));
                            }) }), _jsxs("div", { className: "cart__btns", children: [_jsx(Button, { isDisabled: false, type: "primary", children: "Order Now" }), _jsx(Button, { isDisabled: false, type: "tertiary", children: "Clear cart" })] })] })) }))] }));
}
export default Cart;
