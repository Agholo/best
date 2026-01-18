import { Product } from "@/types/product";

export interface CategoryField {
	id: string;
	name: string;
	type: "checkbox" | "range";
}

export type FilterableFields = {
	[fieldName: string]: string[] | { min: string; max: string };
};

export const getCategoryFilterableFields = (
	categoryFields: CategoryField[],
	products: Product[]
): FilterableFields => {
	const filterableFields: FilterableFields = {};

	categoryFields.forEach((field) => {
		if (field.type === "range") {
			// For range fields, calculate min and max from products
			let min = Infinity;
			let max = 0;

			products.forEach((product) => {
				const value = product[field.name];
				if (value !== undefined) {
					const numValue = Number(value);
					if (!isNaN(numValue)) {
						min = Math.min(min, numValue);
						max = Math.max(max, numValue);
					}
				}
			});

			if (min !== Infinity && max !== 0) {
				filterableFields[field.name] = { min: String(min), max: String(max) };
			}
		} else {
			// For checkbox fields, collect unique values from products
			const uniqueValues = new Set<string>();

			products.forEach((product) => {
				const value = product[field.name];
				if (value !== undefined && value !== null) {
					uniqueValues.add(String(value));
				}
			});

			if (uniqueValues.size > 0) {
				filterableFields[field.name] = Array.from(uniqueValues);
			}
		}
	});

	return filterableFields;
};

