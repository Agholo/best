"use client";

import useFilter from "@/hooks/useFilter";
import { getProductsByCategory } from "@/utils/getProductsByCategory";
import { products as mockProducts } from "@/mock/products";
import Image from "next/image";
import Text from "@/ui/Text";
import { spreadProductFilterables } from "@/utils/spreadProductFilterables";
import { Button } from "@/ui/Button";
import useCart from "@/hooks/useCart";
import { FilteredProduct } from "@/types/product";
import { useTranslation } from "react-i18next";
import CartItemControls from "../CartItemControls";
import { CartItem } from "../CartItem/types";

export default function ProductList({ category }: { category: string }) {
	const { t } = useTranslation("category");
	const items = getProductsByCategory(mockProducts, category);
	const { filteredProducts } = useFilter(items);
	const products = spreadProductFilterables(filteredProducts);
	const { addItem, isInCart, removeItem, items: cartItems } = useCart();
	const handleAddToCart = (product: FilteredProduct) => {
		addItem(product);
	};
	const handleRemoveFromCart = (id: string) => {
		removeItem(id);
	};

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
			{products.map((item) => (
				<div key={item.id} className="bg-background-tint1 rounded-2xl p-4">
					<Image src={item.image} alt={item.name} width={100} height={100} className="max-h-40 object-cover w-full" />
					<Text className="mt-2">{item.name}</Text>
					<Text className="mb-2">{item.price}</Text>
					{isInCart(item.id) ?
						<CartItemControls
							onRemove={handleRemoveFromCart}
							onAdd={handleAddToCart}
							item={cartItems.find((cartItem) => cartItem.id === item.id) as CartItem}
						/> :
						<Button onClick={() => handleAddToCart(item)} className="w-full">{t("product.add_to_cart")}</Button>}
				</div>
			))}
		</div>
	);
}
