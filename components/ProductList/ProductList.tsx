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
import { MinusIcon, PlusIcon } from "lucide-react";

export default function ProductList({ category }: { category: string }) {
	const items = getProductsByCategory(mockProducts, category);
	const { filteredProducts } = useFilter(items);
	const products = spreadProductFilterables(filteredProducts);
	const { addItem, isInCart, removeItem, getItemQuantity } = useCart();
	const handleAddToCart = (product: FilteredProduct) => {
		addItem(product);
	};
	const handleRemoveFromCart = (product: FilteredProduct) => {
		removeItem(product.id);
	};

	return (
		<div className="grid grid-cols-3 gap-4 w-full">
			{products.map((item) => (
				<div key={item.id} className="bg-background-tint1 rounded-2xl p-4">
					<Image src={item.image} alt={item.name} width={100} height={100} className="max-h-40 object-cover w-full" />
					<Text>{item.name}</Text>
					<Text>{item.price}</Text>
					{isInCart(item.id) ?
						<div className="flex items-center gap-2">
							<Button variant="outline" onClick={() => handleRemoveFromCart(item)}><MinusIcon /></Button>
							<Text>{getItemQuantity(item.id)}</Text>
							<Button variant="outline" onClick={() => handleAddToCart(item)}><PlusIcon /></Button>
						</div> :
						<Button onClick={() => handleAddToCart(item)}>Add to Cart</Button>}
				</div>
			))}
		</div>
	);
}
