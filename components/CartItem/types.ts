import { Product } from "@/types/product";

export interface CartItem extends Product {
	quantity: number;
}

export interface CartItemProps {
	item: CartItem;
	onRemove: (id: string) => void;
	onAdd: (item: Product) => void;
	onDelete: (id: string) => void;
}

