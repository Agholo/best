import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { translateCategoryName } from "./translation";
import { upsertTranslation, deleteTranslation } from "./translationDb";
import { generateCategoryKey } from "@/utils/generateCategoryKey";

export { generateCategoryKey };

export interface CreateCategoryData {
	name: string;
	icon: string;
	fields: Array<{
		id: string;
		name: string;
		type: string;
	}>;
}

export interface CategoryResult {
	id: string;
	name: string;
	icon: string;
	url: string;
	fields: Array<{
		id: string;
		name: string;
		type: string;
	}>;
	createdAt: Date;
	updatedAt: Date;
}

export async function createCategory(
	data: CreateCategoryData
): Promise<{ category: CategoryResult; error: null } | { category: null; error: string }> {
	try {
		// Check if category with same name already exists
		const existingCategory = await prisma.category.findFirst({
			where: { name: data.name },
		});

		if (existingCategory) {
			return { category: null, error: "Category with this name already exists" };
		}

		// Generate URL from name (slugify)
		const url = `/categories/${data.name.toLowerCase().replace(/\s+/g, "-")}`;

		// Create category
		const category = await prisma.category.create({
			data: {
				name: data.name,
				icon: data.icon,
				url,
				fields: data.fields as Prisma.InputJsonValue,
			},
		});

		// Translate category name and save to database
		try {
			const translations = await translateCategoryName(data.name);
			const categoryKey = generateCategoryKey(data.name);

			// Save translations to database
			const translationResult = await upsertTranslation({
				key: categoryKey,
				namespace: "categories",
				values: translations,
			});

			if (translationResult.success) {
				console.log(`Translations saved to database for category: ${data.name}`, translations);
			} else {
				console.error("Error saving translations to database:", translationResult.error);
			}
		} catch (translationError) {
			// Log error but don't fail category creation if translation fails
			// Use same text for all languages as fallback
			console.error("Error adding translations:", translationError);
			try {
				const categoryKey = generateCategoryKey(data.name);
				const fallbackTranslations = {
					en: data.name,
					am: data.name,
					ru: data.name,
				};
				await upsertTranslation({
					key: categoryKey,
					namespace: "categories",
					values: fallbackTranslations,
				});
				console.log(`Fallback translations saved to database for category: ${data.name}`);
			} catch (fallbackError) {
				console.error("Error saving fallback translations:", fallbackError);
			}
		}

		return {
			category: {
				...category,
				fields: category.fields as Array<{
					id: string;
					name: string;
					type: string;
				}>,
			},
			error: null,
		};
	} catch (error) {
		console.error("Error creating category:", error);

		// Provide more specific error messages
		if (error instanceof Error) {
			// Check for Prisma errors
			if (error.message.includes("P2002")) {
				// Unique constraint violation
				if (error.message.includes("name")) {
					return { category: null, error: "Category with this name already exists" };
				}
				if (error.message.includes("url")) {
					return { category: null, error: "Category with this URL already exists" };
				}
			}

			// Check if table doesn't exist
			if (error.message.includes("does not exist") || error.message.includes("Unknown table")) {
				return {
					category: null,
					error: "Category table does not exist. Please run database migration: npx prisma migrate dev"
				};
			}

			// Check if prisma.category is undefined
			if (error.message.includes("Cannot read properties of undefined") || error.message.includes("findFirst")) {
				return {
					category: null,
					error: "Prisma client not properly initialized. Please restart the server and ensure you've run: npx prisma generate"
				};
			}

			return { category: null, error: `Failed to create category: ${error.message}` };
		}

		return { category: null, error: "Failed to create category" };
	}
}

export async function getAllCategories(): Promise<{ categories: CategoryResult[]; error: null } | { categories: null; error: string }> {
	try {
		const categories = await prisma.category.findMany({
			orderBy: { createdAt: "desc" },
		});

		return {
			categories: categories.map((category) => ({
				...category,
				fields: category.fields as Array<{
					id: string;
					name: string;
					type: string;
				}>,
			})) as CategoryResult[],
			error: null,
		};
	} catch (error) {
		console.error("Error fetching categories:", error);
		return { categories: null, error: "Failed to fetch categories" };
	}
}

export async function getCategoryByName(
	name: string
): Promise<{ category: CategoryResult; error: null } | { category: null; error: string }> {
	try {
		const category = await prisma.category.findFirst({
			where: { name },
		});

		if (!category) {
			return { category: null, error: "Category not found" };
		}

		return {
			category: {
				...category,
				fields: category.fields as Array<{
					id: string;
					name: string;
					type: string;
				}>,
			},
			error: null,
		};
	} catch (error) {
		console.error("Error fetching category:", error);
		return { category: null, error: "Failed to fetch category" };
	}
}

export async function deleteCategory(
	id: string
): Promise<{ success: true; error: null } | { success: false; error: string }> {
	try {
		const category = await prisma.category.findUnique({
			where: { id },
		});

		if (!category) {
			return { success: false, error: "Category not found" };
		}

		// Delete all products in this category
		await prisma.product.deleteMany({
			where: { category: category.name },
		});

		// Delete associated translation
		const categoryKey = generateCategoryKey(category.name);
		await deleteTranslation(categoryKey);

		// Delete the category
		await prisma.category.delete({
			where: { id },
		});

		return { success: true, error: null };
	} catch (error) {
		console.error("Error deleting category:", error);
		return { success: false, error: "Failed to delete category" };
	}
}

