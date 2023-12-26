import { rest } from "msw";

export const commonMockResponse = {
	success: true,
	data: {
		createdAt: "2023-12-25T10:18:08.933Z",
		id: 217,
		isDeleted: false,
		product: {
			category: "men's clothing",
			createdAt: "2023-10-16T14:51:55.489Z",
			description:
				"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
			id: 1,
			image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
			isDeleted: false,
			name: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
			price: 109,
			updatedAt: "2023-10-16T14:51:55.489Z",
		},
		productId: 1,
		quantity: 1,
		updatedAt: "2023-12-25T10:18:08.933Z",
		userId: 33,
	},
};
// https://api-server-onboarding-task-shopping-cart.onrender.com/

export const handlers = [
	rest.post(
		"https://api-server-onboarding-task-shopping-cart.onrender.com/login",
		async (req, res, ctx) => {
			const reqData = await req.json();
			if (reqData.email && reqData.password) {
				return res(
					ctx.status(200),
					ctx.json({
						success: true,
						data: {
							id: 1,
							firstName: "Megh",
							lastName: "Patel",
							email: "megh@gmail.com",
							refreshToken:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjozMywiZmlyc3ROYW1lIjoiTWVnaCIsImxhc3ROYW1lIjoiUGF0ZWwiLCJlbWFpbCI6Im1lZ2hwYXRlbEBnbWFpbC5jb20ifSwiaWF0IjoxNzAzMjUzMjk0LCJle",
							accessToken:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7I…wOTR9.CkWyQL2gHJfBiKqye8fOnWLREEmhGz2e9OQzVzgDsp4",
						},
					})
				);
			} else {
				return res(
					ctx.status(401),
					ctx.json({ success: false, errMessage: "Something Went Wrong" })
				);
			}
		}
	),
	rest.post(
		"https://api-server-onboarding-task-shopping-cart.onrender.com/signup",
		async (req, res, ctx) => {
			const reqData = await req.json();
			if (
				reqData.firstName &&
				reqData.email &&
				reqData.lastName &&
				reqData.password
			) {
				return res(
					ctx.status(200),
					ctx.json({ id: 1, username: "Megh", message: "SignUp Successfully" })
				);
			} else {
				return res(
					ctx.status(401),
					ctx.json({ success: false, errMessage: "Something Went Wrong" })
				);
			}
		}
	),
	rest.get(
		"https://api-server-onboarding-task-shopping-cart.onrender.com/cart",
		async (req, res, ctx) => {
			return res(
				ctx.status(200),
				ctx.json({
					success: true,
					data: [
						{
							createdAt: "2023-12-22T12:55:36.682Z",
							id: 209,
							isDeleted: false,
							product: {
								id: 2,
								name: "Mens Casual Premium Slim Fit T-Shirts",
								description:
									"Slim-fitting style, contrast raglan long sleeve, t…e round neckline includes a three-button placket.",
								category: "men's clothing",
								price: 22,
							},
							productId: 2,
							quantity: 1,
							updatedAt: "2023-12-22T12:55:36.682Z",
							userId: 33,
						},
					],
				})
			);
		}
	),
	rest.get(
		"https://api-server-onboarding-task-shopping-cart.onrender.com/products",
		async (req, res, ctx) => {
			return res(
				ctx.status(200),
				ctx.json({
					success: true,
					data: Array.from(
						{
							length: 12,
						},
						function (_, i) {
							return {
								category: "men's clothing",
								createdAt: "2023-10-16T14:51:55.489Z",
								description:
									"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
								id: i,
								image:
									"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
								isDeleted: false,
								name: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
								price: 109,
								updatedAt: "2023-10-16T14:51:55.489Z",
							};
						}
					),
				})
			);
		}
	),
	rest.post(
		"https://api-server-onboarding-task-shopping-cart.onrender.com/cart",
		async (req, res, ctx) => {
			return res(ctx.status(200), ctx.json(commonMockResponse));
		}
	),
	rest.delete(
		"https://api-server-onboarding-task-shopping-cart.onrender.com/cart",
		async (req, res, ctx) => {
			return res(ctx.status(200), ctx.json(commonMockResponse));
		}
	),
	rest.delete(
		"https://api-server-onboarding-task-shopping-cart.onrender.com/cart/product",
		async (req, res, ctx) => {
			return res(ctx.status(200), ctx.json(commonMockResponse));
		}
	),
];
