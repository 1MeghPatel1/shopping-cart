import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    products: [],
    searchProducts: [],
};
const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        storeProducts(state, action) {
            state.products = action.payload;
        },
        storeSearchProducts(state, action) {
            state.searchProducts = action.payload;
        },
    },
});
export const { storeProducts, storeSearchProducts } = productsSlice.actions;
export default productsSlice.reducer;
