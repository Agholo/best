import { Product } from "@/types/product";
import { CartItem } from "../CartItem/types";

export interface CartItemControlsProps {
	onRemove: (id: string) => void;
	onAdd: (item: Product) => void;
	item: CartItem;
}

