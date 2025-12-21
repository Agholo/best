import { FilteredProduct } from "@/types/product";
import { CartItem } from "../CartItem/types";

export interface CartItemControlsProps {
	onRemove: (id: string) => void;
	onAdd: (item: FilteredProduct) => void;
	item: CartItem;
}

