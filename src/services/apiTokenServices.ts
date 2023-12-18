import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const shopApiJWT = axios.create({
	baseURL: "https://api-server-onboarding-task-shopping-cart.onrender.com/",
	headers: {
		"Content-Type": "application/json;charset=UTF-8",
	},
});
const shopApiRefreshJWT = axios.create({
	baseURL: "https://api-server-onboarding-task-shopping-cart.onrender.com/",
});

const userInfo = JSON.parse(localStorage.getItem("userInfo")!);
if (userInfo) {
	const { accessToken, refreshToken } = userInfo;

	const generateNewToken = async (refreshToken: string) => {
		if (!refreshToken) {
			throw new Error("no refresh token");
		}
		console.log("generating new token");
		shopApiRefreshJWT.defaults.headers["Authorization"] =
			"Bearer " + refreshToken;
		try {
			const res = await shopApiRefreshJWT.post("generates-accesstoken");
			return res;
		} catch (err) {
			console.log(err);
			return err;
		}
	};

	shopApiJWT.interceptors.request.use(
		async (config) => {
			const decodedToken = jwtDecode(accessToken);
			const currentDate = new Date();
			if (decodedToken.exp! * 1000 < currentDate.getTime()) {
				console.log("generating token");
				try {
					const res: any = await generateNewToken(refreshToken);
					config.headers["Authorization"] =
						"Bearer " + res.data.data.accessToken;
					localStorage.setItem(
						"userInfo",
						JSON.stringify({
							...userInfo,
							accessToken: res.data.data.accessToken,
						})
					);
				} catch (err) {
					console.log(err);
				}
			} else {
				config.headers["Authorization"] = "Bearer " + accessToken;
			}
			return config;
		},
		(err) => {
			Promise.reject(err);
		}
	);
}
