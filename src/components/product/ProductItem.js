import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { formatCurrency } from "../../utils/helper";
import UpdateItemQuantity from "./../cart/UpdateItemQuantity";
import { getCart, postCart } from "../../services/apiServices";
import { useDispatch } from "react-redux";
import { assignCart } from "../../slices/cartSlice";
import toast from "react-hot-toast";
const ProductItem = ({ category, image, name, price, id, qty, isDisabled, setIsDisabled, }) => {
    const truncatedName = name.split(" ").length > 3
        ? name.split(" ").slice(0, 4).join(" ") + "..."
        : name;
    const dispatch = useDispatch();
    const handleAddClick = async () => {
        setIsDisabled(true);
        try {
            const toastId = toast.loading("Adding Item to the Cart...");
            const res = await postCart(id);
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
    return (_jsx(_Fragment, { children: _jsxs("article", { className: "products__item", "data-product-id": id, children: [_jsx("img", { src: image, alt: "", className: "products__item-img" }), _jsxs("div", { className: "products__item-container", children: [_jsxs("div", { className: "products__item-title-box", children: [_jsx("h3", { className: "products__item-title", children: truncatedName }), _jsx("div", { className: "rating__box", children: _jsx("p", { className: "rating__text", children: category }) })] }), _jsxs("div", { className: "products__item-details-box", children: [_jsx("p", { className: "products__item-price", children: formatCurrency(price) }), qty ? (_jsx(UpdateItemQuantity, { isDisabled: isDisabled, setIsDisabled: setIsDisabled, id: id, qty: qty })) : (_jsx("button", { disabled: isDisabled, className: "btn--secondary-2", onClick: handleAddClick, children: "Add to Cart" }))] })] })] }) }));
};
export default ProductItem;
