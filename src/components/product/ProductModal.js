import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "./../../utils/helper";
import toast from "react-hot-toast";
import { getCart, postCart } from "../../services/apiServices";
import { assignCart } from "../../slices/cartSlice";
const ProductModal = ({ id, setOpenItem, isDisabled, setIsDisabled, }) => {
    const [isVisible, setIsVisible] = useState(false);
    const product = useSelector((store) => {
        return store.products.products.find((product) => id === product.id);
    });
    const cart = useSelector((store) => {
        return store.cart.cart;
    });
    const cartProduct = cart.find((item) => item.id === id);
    const qty = cartProduct ? cartProduct.quantity : 0;
    const dispatch = useDispatch();
    const handleClick = () => {
        setOpenItem(null);
        setIsVisible(false);
    };
    const handleAddClick = async () => {
        setIsDisabled(true);
        try {
            const toastId = toast.loading("Adding Item to the Cart...");
            const res = await postCart(product.id);
            if (res.success) {
                const res = await getCart();
                dispatch(assignCart(res.data));
                toast.success("Added to the Cart", {
                    id: toastId,
                });
            }
        }
        catch (err) {
            console.log(err);
            toast.error("Something Went Wrong");
        }
        finally {
            setIsDisabled(false);
        }
    };
    return (_jsx("div", { className: `products__modal-box ${isVisible || id !== null ? "" : "hide"}`, children: product && (_jsxs("div", { className: "products__modal", children: [_jsx("button", { className: "products__modal-close", onClick: () => {
                        handleClick();
                    }, children: "\u274C" }), _jsx("img", { src: product.image, alt: "product photo", className: "products__modal-img" }), _jsxs("div", { className: "products__modal-details-container", children: [_jsx("h1", { className: "products__modal-title", children: product.name }), _jsx("p", { className: "products__modal-description", children: product.description }), _jsx("h3", { className: "products__modal-category", children: product.category }), _jsx("p", { className: "products__modal-price", children: formatCurrency(product.price) }), _jsx("div", { className: "products__modal-actions", children: qty ? (_jsx(UpdateItemQuantity, { isDisabled: isDisabled, setIsDisabled: setIsDisabled, id: product.id, qty: qty })) : (_jsx("button", { onClick: handleAddClick, disabled: isDisabled, className: "btn--secondary-2", children: "Add to Cart" })) })] })] })) }));
};
export default ProductModal;
