import axios from "axios";
import toast from "react-hot-toast";

export const shopApi = axios.create({
	baseURL: "https://api-server-onboarding-task-shopping-cart.onrender.com/",
	timeout: 1000 * 20,
});

export interface userSignUp {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export const signUpRequest = async (data: userSignUp) => {
	const toastId = toast.loading("Loading...");
	try {
		const res = await shopApi.post("signup", data);
		console.log(res.data);
		return res.data;
	} catch (err: any) {
		return err;
	} finally {
		toast.dismiss(toastId);
	}
};
