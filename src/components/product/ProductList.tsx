import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import ProductModal from "./ProductModal";

type productType = {
	category: string;
	image: string;
	price: number;
	name: string;
	id: number;
	Cart: any[];
};

type propType = {
	currentItems: productType[];
};

const ProductList = ({ currentItems }: propType) => {
	console.log(currentItems);
	const [openItem, setOpenItem] = useState<number | null>(null);
	useEffect(() => {
		const handleProductClick = (e: any) => {
			const productItem = e.target.closest(".products__item") as HTMLElement;
			if (!productItem) return;
			if (
				e.target?.closest(".btn--secondary-2")?.classList?.value ===
					"btn--secondary-2" ||
				e.target?.classList?.value === "btn--secondary-2"
			) {
				return;
			}
			const id = Number(productItem.dataset.productId);
			setOpenItem(id);
		};

		const productList = document.querySelector(
			".products__list"
		) as HTMLElement;
		productList.addEventListener("click", handleProductClick);

		// return productList.removeEventListener("click", handleProductClick);
	}, []);

	return (
		<div className="products__list">
			{currentItems.map((product) => (
				<ProductItem
					key={product.id}
					category={product.category}
					image={product.image}
					name={product.name}
					price={product.price}
					qty={product?.Cart?.length > 0 ? product?.Cart[0].quantity : 0}
					id={product.id}
				/>
			))}
			<ProductModal id={openItem} setOpenItem={setOpenItem} />
		</div>
	);
};

export default ProductList;
