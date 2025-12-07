"use client";

import useFilter from "@/hooks/useFilter";
import { getProductsByCategory } from "@/utils/getProductsByCategory";
import { products as mockProducts } from "@/mock/products";
import Image from "next/image";
import Text from "@/ui/Text";
import { spreadProductFilterables } from "@/utils/spreadProductFilterables";

export default function ProductList({ category }: { category: string }) {
	const items = getProductsByCategory(mockProducts, category);
	const { filteredProducts } = useFilter(items);
	const products = spreadProductFilterables(filteredProducts);

	return (
		<div className="grid grid-rows-3 grid-cols-3 gap-4 w-full">
			{products.map((item) => (
				<div key={item.id} className="bg-background-tint1 rounded-2xl p-4">
					<Image src={item.image} alt={item.name} width={100} height={100} className="max-h-40 object-cover w-full" />
					<Text>{item.name}</Text>
					<Text>{item.price}</Text>
				</div>
			))}
		</div>
	);
}