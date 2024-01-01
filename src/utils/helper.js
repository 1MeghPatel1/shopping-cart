export const formatCurrency = (price) => {
    const formatedPrice = new Intl.NumberFormat("en", {
        style: "currency",
        currency: "INR",
    }).format(price);
    return formatedPrice;
};
