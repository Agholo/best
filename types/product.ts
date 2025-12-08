export interface Product {
	id: string;
	name: string;
	description: string;
	image: string;
	category: string;
	stock: number;
	filterable: {
		brand: string;
		price: string;
	};
}

export type FilteredProduct = Omit<Product, "filterable"> & Product["filterable"];
export type FilteredProducts = FilteredProduct[];
