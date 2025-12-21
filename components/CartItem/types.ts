import { FilteredProduct } from "@/types/product";

export interface CartItem extends FilteredProduct {
	quantity: number;
}

export interface CartItemProps {
	item: CartItem;
	onRemove: (id: string) => void;
	onAdd: (item: FilteredProduct) => void;
	onDelete: (id: string) => void;
}

