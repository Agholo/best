export interface Product {
	id: string;
	name: string;
	description: string;
	image: string;
	category: string;
	stock: number;
	[key: string]: string | number; // Allow dynamic filterable fields
}

export type FilteredProduct = Product;
export type FilteredProducts = FilteredProduct[];
