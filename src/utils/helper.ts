export const formatCurrency = (price: number) => {
	const formatedPrice = new Intl.NumberFormat("en", {
		style: "currency",
		currency: "INR",
	}).format(price);
	return formatedPrice;
};
