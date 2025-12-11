"use client";

import { parseAsString, parseAsArrayOf, useQueryStates } from "nuqs";
import { Product } from "@/types/product";
import { getProductFilterableFields } from "@/utils/getProductFilterableFields";

type FilterState = {
	price: string;
} & {
	[K in Exclude<keyof Product["filterable"], "price">]: string[];
};

export default function useFilter(products: Product[]) {
	const filterableKeys = Object.keys(products[0]?.filterable || {}) as Array<keyof Product["filterable"]>;
	const parsers = Object.fromEntries(
		filterableKeys.map((key) => [
			key,
			key === "price"
				? parseAsString.withDefault("")
				: parseAsArrayOf(parseAsString).withDefault([])
		])
	);
	const [filters, setFilters] = useQueryStates(parsers);
	const typedFilters = filters as FilterState;
	const typedSetFilters = setFilters as (updates: Partial<FilterState>) => void;
	const filteredProducts = products.filter((product) => {
		return Object.entries(typedFilters).every(([key, value]) => {
			if (key === "price") {
				if (!value || typeof value !== "string") return true;
				const [min, max] = value.split("-");
				return Number(product.filterable.price) >= Number(min) && Number(product.filterable.price) <= Number(max);
			}
			if (Array.isArray(value)) {
				if (value.length === 0) return true;
				return value.includes(product.filterable[key as keyof Product["filterable"]] as string);
			}
			return product.filterable[key as keyof Product["filterable"]] === value;
		});
	});
	const filterableFields = getProductFilterableFields(products);

	return {
		filters: typedFilters,
		setFilters: typedSetFilters,
		filteredProducts,
		filterableFields,
	};
}