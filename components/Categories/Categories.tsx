"use client";

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";
import Category from "./Category";
import Text from "@/ui/Text";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/ui/carousel";
import useUserRole from "@/hooks/useUserRole";
import { Category as CategoryType } from "./Category/types";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog";
import CategoryPopup from "../CategoryPopup";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface DatabaseCategory {
	id: string;
	name: string;
	icon: string;
	url: string;
	createdAt: Date;
	updatedAt: Date;
}

export default function Categories() {
	const { t } = useTranslation("categories");
	const { isAdmin } = useUserRole();
	const [categories, setCategories] = useState<CategoryType[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [categoryToDelete, setCategoryToDelete] = useState<{ id: string; name: string } | null>(null);
	const [databaseCategories, setDatabaseCategories] = useState<DatabaseCategory[]>([]);

	useEffect(() => {
		const fetchCategories = async (): Promise<void> => {
			try {
				setLoading(true);
				const response = await axios.get<{ categories: DatabaseCategory[] }>("/api/categories");

				if (response.data.categories) {
					// Store database categories for deletion
					setDatabaseCategories(response.data.categories);
					// Map database categories to component format
					const mappedCategories: CategoryType[] = response.data.categories.map((cat, index) => ({
						id: index + 1, // Use index-based ID for component compatibility
						title: cat.name,
						url: cat.url,
						icon: cat.icon as CategoryType["icon"],
					}));

					setCategories(mappedCategories);
				}
			} catch (err) {
				console.error("Error fetching categories:", err);
				setError("Failed to load categories");
			} finally {
				setLoading(false);
			}
		};

		fetchCategories();
	}, []);

	const handleCategoryAdded = (): void => {
		// Refetch categories after a new one is added
		const fetchCategories = async (): Promise<void> => {
			try {
				const response = await axios.get<{ categories: DatabaseCategory[] }>("/api/categories");

				if (response.data.categories) {
					const mappedCategories: CategoryType[] = response.data.categories.map((cat, index) => ({
						id: index + 1, // Use index-based ID for component compatibility
						title: cat.name,
						url: cat.url,
						icon: cat.icon as CategoryType["icon"],
					}));

					setCategories(mappedCategories);
				}
			} catch (err) {
				console.error("Error refetching categories:", err);
			}
		};

		fetchCategories();
	};

	const handleDeleteClick = (categoryId: string, categoryName: string): void => {
		setCategoryToDelete({ id: categoryId, name: categoryName });
		setDeleteDialogOpen(true);
	};

	const handleDeleteConfirm = async (): Promise<void> => {
		if (!categoryToDelete) return;

		try {
			await axios.delete(`/api/categories?id=${categoryToDelete.id}`);
			// Refresh categories after deletion
			handleCategoryAdded();
			setCategoryToDelete(null);
			toast.success("Category deleted successfully");
		} catch (error) {
			console.error("Failed to delete category:", error);
			if (axios.isAxiosError(error) && error.response) {
				toast.error(error.response.data?.error || "Failed to delete category. Please try again.");
			} else {
				toast.error("Failed to delete category. Please try again.");
			}
		}
	};

	if (loading) {
		return (
			<div className="flex flex-col gap-8 w-full">
				<Text type="h1" size="2xl" weight="bold" letterSpacing="wide">
					{t("title")}
				</Text>
				<div className="flex items-center justify-center py-8">
					<Text>Loading categories...</Text>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex flex-col gap-8 w-full">
				<Text type="h1" size="2xl" weight="bold" letterSpacing="wide">
					{t("title")}
				</Text>
				<div className="flex items-center justify-center py-8">
					<Text className="text-destructive">{error}</Text>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-8 w-full">
			<Text type="h1" size="2xl" weight="bold" letterSpacing="wide">
				{t("title")}
			</Text>
			<Carousel
				opts={{
					align: "start",
					loop: true,
				}}
				className="w-full"
			>
				<CarouselContent className="-ml-2 md:-ml-4">
					{isAdmin && (
						<CarouselItem className="pl-2 md:pl-4 basis-[20%]">
							<CategoryPopup onSuccess={handleCategoryAdded}>
								<div className="flex items-center gap-2 flex-col py-6 flex-1 bg-background-tint1 rounded-2xl cursor-pointer relative">
									<div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
										<Plus className="stroke-primary" />
									</div>
									<Text size="sm">{t("Add Category")}</Text>
								</div>
							</CategoryPopup>
						</CarouselItem>
					)}
					{categories.map((category, index) => {
						const dbCategory = databaseCategories[index];
						return (
							<CarouselItem key={category.id} className="pl-2 md:pl-4 basis-[20%]">
								<Category
									{...category}
									isAdmin={isAdmin}
									onDelete={dbCategory ? () => handleDeleteClick(dbCategory.id, category.title) : undefined}
								/>
							</CarouselItem>
						);
					})}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
			<DeleteConfirmationDialog
				open={deleteDialogOpen}
				onOpenChange={setDeleteDialogOpen}
				onConfirm={handleDeleteConfirm}
				title="Delete Category"
				description={
					<>
						Are you sure you want to delete{" "}
						{categoryToDelete?.name && <strong>{categoryToDelete.name}</strong>}?
						<br />
						<br />
						<strong className="text-destructive">Warning:</strong> All products in this category will also be deleted.
						<br />
						<br />
						This action cannot be undone.
					</>
				}
			/>
		</div>
	);
}

