import { Product } from "@/types/product";

type FilterableFields = {
	price: { min: string; max: string };
} & {
	[K in Exclude<keyof Product["filterable"], "price">]: string[];
};

export const getProductFilterableFields = (products: Product[]): FilterableFields => {
	const filterableFields: Partial<FilterableFields> = {};
	let min = Infinity;
	let max = 0;
	products.forEach((product) => {
		Object.entries(product.filterable).forEach(([key, value]) => {
			if (key === 'price') {
				min = Math.min(min, Number(value));
				max = Math.max(max, Number(value));
				return;
			}
			const filterKey = key as Exclude<keyof Product["filterable"], "price">;
			if (!filterableFields[filterKey]) {
				filterableFields[filterKey] = [value as string];
			} else if(!(filterableFields[filterKey] as string[]).includes(value as string)) {
				(filterableFields[filterKey] as string[]).push(value as string);
			}
		});
	});

	if (min !== 0 && max !== 0) {
		filterableFields.price = { min: String(min), max: String(max) };
	}
	return filterableFields as FilterableFields;
};