"use client";

import { parseAsString, parseAsArrayOf, useQueryStates } from "nuqs";
import { useMemo } from "react";
import { Product } from "@/types/product";
import { getCategoryFilterableFields, type CategoryField } from "@/utils/getCategoryFilterableFields";

type FilterState = {
	[fieldName: string]: string | string[];
};

export default function useFilter(products: Product[], categoryFields: CategoryField[]) {
	// Build parsers based on category fields
	const parsers = Object.fromEntries(
		categoryFields.map((field) => [
			field.name,
			field.type === "range"
				? parseAsString.withDefault("")
				: parseAsArrayOf(parseAsString).withDefault([])
		])
	);

	const [filters, setFilters] = useQueryStates(parsers);
	const typedFilters = filters as FilterState;
	const typedSetFilters = setFilters as (updates: Partial<FilterState>) => void;

	const filteredProducts = products.filter((product) => {
		return Object.entries(typedFilters).every(([key, value]) => {
			const field = categoryFields.find((f) => f.name === key);
			if (!field) return true;

			const productValue = product[key];

			if (field.type === "range") {
				if (!value || typeof value !== "string") return true;
				const [min, max] = value.split("-");
				const numValue = Number(productValue);
				if (isNaN(numValue)) return false;
				return numValue >= Number(min) && numValue <= Number(max);
			}

			if (Array.isArray(value)) {
				if (value.length === 0) return true;
				return value.includes(String(productValue));
			}

			return String(productValue) === String(value);
		});
	});

	const filterableFields = useMemo(() => {
		return getCategoryFilterableFields(categoryFields, products);
	}, [categoryFields, products]);

	return {
		filters: typedFilters,
		setFilters: typedSetFilters,
		filteredProducts,
		filterableFields,
	};
}