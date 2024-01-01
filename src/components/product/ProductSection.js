import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { getProduct, getProducts } from "../../services/apiServices";
import { storeProducts, storeSearchProducts } from "../../slices/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
const ProductSection = () => {
    const dispatch = useDispatch();
    const products = useSelector((store) => store.products.products);
    const searchProducts = useSelector((store) => store.products.searchProducts);
    const [serachQuery, setSearchQuery] = useState("");
    const [searchedState, setSearchedState] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const toastId = toast.loading("Searching Product...");
        try {
            const res = await getProduct(serachQuery);
            if (res.success) {
                dispatch(storeSearchProducts(res.data));
                toast.success(`Found ${res.data.length} results`, {
                    id: toastId,
                });
                setCurrentPage(1);
            }
        }
        catch (err) {
            console.log(err);
            toast.error("Something went Wrong", {
                id: toastId,
            });
        }
    };
    //pagination logic
    const itemsPerPage = 8;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = searchProducts.length > 0 && searchedState
        ? searchProducts.slice(indexOfFirstItem, indexOfLastItem)
        : products.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = searchProducts.length > 0 && searchedState
        ? Math.ceil(searchProducts.length / itemsPerPage)
        : Math.ceil(products.length / itemsPerPage);
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    useEffect(() => {
        const fetchProducts = async () => {
            const res = await getProducts();
            dispatch(storeProducts(res.data));
        };
        fetchProducts();
    }, [dispatch]);
    return (_jsxs("section", { className: "products", children: [_jsxs("div", { className: "products__search-container", children: [_jsx("h1", { className: "products__heading", children: "Our Products" }), _jsxs("form", { onSubmit: (e) => {
                            handleSubmit(e);
                        }, className: "products__search-input-box", children: [_jsx("input", { type: "text", className: "products__search-input", placeholder: "Search for specific product", value: serachQuery, onChange: (e) => {
                                    if (e.target.value.length < 2) {
                                        setSearchedState(false);
                                        dispatch(storeSearchProducts([]));
                                    }
                                    setSearchQuery(e.target.value);
                                    setSearchedState(true);
                                } }), _jsx("button", { className: "btn--primary", children: "Search" })] })] }), _jsx(ProductList, { currentItems: currentItems }), _jsx("div", { className: "products__paginate-btns", children: Array.from({ length: totalPages }, (_, index) => (_jsx("button", { className: `products__paginate-btn ${currentPage === index + 1 ? "products__active-page" : ""}`, onClick: () => paginate(index + 1), children: index + 1 }, index + 1))) })] }));
};
export default ProductSection;
