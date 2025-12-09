"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FilteredProduct } from "@/types/product";

interface CartItem extends FilteredProduct {
	quantity: number;
}

interface CartState {
	items: CartItem[];
	addItem: (product: FilteredProduct, quantity?: number) => void;
	removeItem: (productId: string) => void;
	deleteItem: (productId: string) => void;
	updateQuantity: (productId: string, quantity: number) => void;
	clearCart: () => void;
	isInCart: (productId: string) => boolean;
	getTotalItems: () => number;
	getTotalPrice: () => string;
}

const useCart = create<CartState>()(
	persist(
		(set, get) => ({
			items: [],
			addItem: (product, quantity = 1) => {
				set((state) => {
					const existingItem = state.items.find((item) => item.id === product.id);
					if (existingItem) {
						return {
							items: state.items.map((item) =>
								item.id === product.id
									? { ...item, quantity: item.quantity + quantity }
									: item
							),
						};
					}
					return {
						items: [...state.items, { ...product, quantity }],
					};
				});
			},
			removeItem: (productId) => {
				set((state) => {
					const existingItem = state.items.find((item) => item.id === productId);
					if (!existingItem) {
						return state;
					}
					if (existingItem.quantity === 1) {
						return {
							items: state.items.filter((item) => item.id !== productId),
						};
					}
					return {
						items: state.items.map((item) =>
							item.id === productId
								? { ...item, quantity: item.quantity - 1 }
								: item
						),
					};
				});
			},
			deleteItem: (productId) => {
				set((state) => ({
					items: state.items.filter((item) => item.id !== productId),
				}));
			},
			updateQuantity: (productId, quantity) => {
				if (quantity <= 0) {
					get().deleteItem(productId);
					return;
				}
				set((state) => ({
					items: state.items.map((item) =>
						item.id === productId ? { ...item, quantity } : item
					),
				}));
			},
			clearCart: () => {
				set({ items: [] });
			},
			isInCart: (productId) => {
				return get().items.some((item) => item.id === productId);
			},
			getTotalItems: () => {
				return get().items.reduce((total, item) => total + item.quantity, 0);
			},
			getTotalPrice: () => {
				return get().items.reduce(
					(total, item) => total + Number(item.price) * item.quantity,
					0
				).toFixed(2);
			},
			getItemQuantity: (productId: string) => {
				return get().items.find((item) => item.id === productId)?.quantity || 0;
			},
			getCartItem: (productId: string) => {
				return get().items.find((item) => item.id === productId);
			},
		}),
		{
			name: "cart-storage",
			storage: {
				getItem: (name) => {
					const str = sessionStorage.getItem(name);
					return str ? JSON.parse(str) : null;
				},
				setItem: (name, value) => {
					sessionStorage.setItem(name, JSON.stringify(value));
				},
				removeItem: (name) => {
					sessionStorage.removeItem(name);
				},
			},
		}
	)
);

export default useCart;