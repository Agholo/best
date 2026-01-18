"use client";

import useFilter from "@/hooks/useFilter";
import Image from "next/image";
import Text from "@/ui/Text";
import { Button } from "@/ui/Button";
import useCart from "@/hooks/useCart";
import { Product } from "@/types/product";
import { useTranslation } from "react-i18next";
import CartItemControls from "../CartItemControls";
import { CartItem } from "../CartItem/types";
import { useState, useEffect } from "react";
import { type CategoryField } from "@/utils/getCategoryFilterableFields";
import axios from "axios";
import useUserRole from "@/hooks/useUserRole";
import ProductPopup from "../ProductPopup";
import { Plus, Trash2 } from "lucide-react";
import DeleteConfirmationDialog from "../DeleteConfirmationDialog";
import { toast } from "sonner";

export default function ProductList({ category }: { category: string }) {
	const { t } = useTranslation("category");
	const { isAdmin } = useUserRole();
	const [categoryFields, setCategoryFields] = useState<CategoryField[]>([]);
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [productToDelete, setProductToDelete] = useState<Product | null>(null);

	useEffect(() => {
		const fetchCategory = async (): Promise<void> => {
			try {
				const response = await axios.get(`/api/categories?name=${encodeURIComponent(category)}`);
				if (response.data?.category?.fields) {
					setCategoryFields(response.data.category.fields as CategoryField[]);
				}
			} catch (error) {
				console.error("Failed to fetch category:", error);
			}
		};

		fetchCategory();
	}, [category]);

	useEffect(() => {
		const fetchProducts = async (): Promise<void> => {
			try {
				setLoading(true);
				const response = await axios.get(`/api/products?category=${encodeURIComponent(category)}`);
				if (response.data?.products) {
					setProducts(response.data.products as Product[]);
				}
			} catch (error) {
				console.error("Failed to fetch products:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, [category]);

	const { filteredProducts } = useFilter(products, categoryFields);
	const { addItem, isInCart, removeItem, items: cartItems } = useCart();

	const handleAddToCart = (product: Product): void => {
		addItem(product);
	};

	const handleRemoveFromCart = (id: string): void => {
		removeItem(id);
	};

	const handleDeleteClick = (product: Product): void => {
		setProductToDelete(product);
		setDeleteDialogOpen(true);
	};

	const handleDeleteConfirm = async (): Promise<void> => {
		if (!productToDelete) return;

		try {
			await axios.delete(`/api/products/${productToDelete.id}`);
			// Refresh products after deletion
			const response = await axios.get(`/api/products?category=${encodeURIComponent(category)}`);
			if (response.data?.products) {
				setProducts(response.data.products as Product[]);
			}
			setProductToDelete(null);
			toast.success("Product deleted successfully");
		} catch (error) {
			console.error("Failed to delete product:", error);
			if (axios.isAxiosError(error) && error.response) {
				toast.error(error.response.data?.error || "Failed to delete product. Please try again.");
			} else {
				toast.error("Failed to delete product. Please try again.");
			}
		}
	};

	const handleProductAdded = (): void => {
		// Refresh products after adding
		const fetchProducts = async (): Promise<void> => {
			try {
				const response = await axios.get(`/api/products?category=${encodeURIComponent(category)}`);
				if (response.data?.products) {
					setProducts(response.data.products as Product[]);
				}
			} catch (error) {
				console.error("Failed to fetch products:", error);
			}
		};

		fetchProducts();
	};

	if (loading) {
		return (
			<div className="w-full flex justify-center items-center py-8">
				<Text>Loading products...</Text>
			</div>
		);
	}

	return (
		<div className="w-full">
			{isAdmin && (
				<div className="mb-4 flex justify-end">
					<ProductPopup category={category} onSuccess={handleProductAdded}>
						<Button variant="outline" className="flex items-center gap-2">
							<Plus className="size-4" />
							{t("product.add_product") || "Add Product"}
						</Button>
					</ProductPopup>
				</div>
			)}
			<div className="grid grid-cols-3 gap-4 w-full">
				{filteredProducts.map((item) => (
					<div key={item.id} className="bg-background-tint1 rounded-2xl p-4 relative">
						{isAdmin && (
							<Button
								variant="ghost"
								size="icon-sm"
								onClick={() => handleDeleteClick(item)}
								className="absolute top-2 right-2 text-destructive hover:text-destructive hover:bg-destructive/10"
							>
								<Trash2 className="size-4" />
							</Button>
						)}
						<Image src={item.image} alt={item.name} width={100} height={100} className="max-h-40 object-cover w-full" />
						<Text>{item.name}</Text>
						<Text>{item.price}</Text>
						{isInCart(item.id) ?
							<CartItemControls
								onRemove={handleRemoveFromCart}
								onAdd={handleAddToCart}
								item={cartItems.find((cartItem) => cartItem.id === item.id) as CartItem}
							/> :
							<Button onClick={() => handleAddToCart(item)}>{t("product.add_to_cart")}</Button>}
					</div>
				))}
			</div>
			<DeleteConfirmationDialog
				open={deleteDialogOpen}
				onOpenChange={setDeleteDialogOpen}
				onConfirm={handleDeleteConfirm}
				title="Delete Product"
				description={
					<>
						Are you sure you want to delete{" "}
						{productToDelete?.name && <strong>{productToDelete.name}</strong>}?
						<br />
						<br />
						This action cannot be undone.
					</>
				}
			/>
		</div>
	);
}
