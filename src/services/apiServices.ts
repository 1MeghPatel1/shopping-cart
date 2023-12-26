import axios from "axios";
import toast from "react-hot-toast";
import { shopApiJWT } from "./apiTokenServices";

export const authApi = axios.create({
	baseURL: "https://api-server-onboarding-task-shopping-cart.onrender.com/",
});

export interface userSignUp {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}
export interface userLogIn {
	email: string;
	password: string;
}

export const signUpRequest = async (data: userSignUp) => {
	toast.dismiss();
	const toastId = toast.loading("Submitting User Information...");
	try {
		const res = await authApi.post("signup", data);
		return res.data;
	} catch (err: any) {
		return err.response.data;
	} finally {
		toast.dismiss(toastId);
	}
};

export const logInRequest = async (data: userLogIn) => {
	toast.dismiss();
	const toastId = toast.loading("Validating User Information...");
	try {
		const res = await authApi.post("login", data);
		return res.data;
	} catch (err: any) {
		console.log(err, "err");
		return err.response.data;
	} finally {
		toast.dismiss(toastId);
	}
};

export const getProducts = async (page = 1, limit = 20) => {
	try {
		const res = await shopApiJWT.get(`products?page=${page}&limit=${limit}`);
		return res.data;
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const getProduct = async (search: string) => {
	try {
		const res = await shopApiJWT.get(`products?search=${search}`);
		return res.data;
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const postCart = async (productId: number) => {
	//add product to cart and increases qty.
	try {
		const res = await shopApiJWT.post("cart", { productId });
		return res.data;
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const deleteCartProduct = async (productId: number) => {
	//deletes whole product
	try {
		const res = await shopApiJWT.delete("cart/product", {
			data: { productId },
		});
		console.log(res.data);
		return res.data;
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const deleteCartQty = async (productId: number) => {
	//decreases product qty.
	try {
		const res = await shopApiJWT.delete("cart", {
			data: { productId },
		});
		return res.data;
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const getCartCount = async () => {
	try {
		const res = await shopApiJWT.get("cart/count");
		return res.data;
	} catch (err) {
		console.log(err);
		return err;
	}
};

export const getCart = async () => {
	//get total number of diffrent product in the cart
	try {
		const res = await shopApiJWT.get("cart");
		return res.data;
	} catch (err) {
		console.log(err);
		return err;
	}
};
