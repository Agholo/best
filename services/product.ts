import { prisma } from "@/lib/prisma";
import { Product } from "@/types/product";

export interface CreateProductData {
	name: string;
	description: string;
	image: string;
	stock: number;
	category: string;
	filterableFields: Record<string, string>;
	additionalFields?: Record<string, string>;
}

export interface ProductResult {
	id: string;
	name: string;
	description: string;
	image: string;
	stock: number;
	category: string;
	data: Record<string, string | number>;
	createdAt: Date;
	updatedAt: Date;
}

export async function createProduct(
	data: CreateProductData
): Promise<{ product: ProductResult; error: null } | { product: null; error: string }> {
	try {
		// Combine filterableFields and additionalFields into data
		const productData = {
			...data.filterableFields,
			...(data.additionalFields || {}),
		};

		// Convert string values to numbers where appropriate (for range fields that are prices)
		const processedData: Record<string, string | number> = {};
		Object.entries(productData).forEach(([key, value]) => {
			// Try to convert to number if it's a valid number string
			const numValue = Number(value);
			if (!isNaN(numValue) && value !== "" && String(value).trim() !== "") {
				processedData[key] = numValue;
			} else if (value !== "") {
				processedData[key] = String(value);
			}
		});

		// @ts-expect-error - Prisma client may need regeneration
		const product = await prisma.product.create({
			data: {
				name: data.name,
				description: data.description,
				image: data.image,
				stock: data.stock,
				category: data.category,
				data: processedData as unknown as Record<string, unknown>,
			},
		});

		return {
			product: {
				...product,
				data: product.data as Record<string, string | number>,
			},
			error: null,
		};
	} catch (error) {
		console.error("Error creating product:", error);

		// Provide more specific error messages
		if (error instanceof Error) {
			// Check if table doesn't exist
			if (error.message.includes("does not exist") || error.message.includes("Unknown table")) {
				return {
					product: null,
					error: "Product table does not exist. Please run database migration: npx prisma migrate dev"
				};
			}

			// Check if prisma.product is undefined
			if (error.message.includes("Cannot read properties of undefined") || error.message.includes("create")) {
				return {
					product: null,
					error: "Prisma client not properly initialized. Please restart the server and ensure you've run: npx prisma generate"
				};
			}

			return { product: null, error: `Failed to create product: ${error.message}` };
		}

		return { product: null, error: "Failed to create product" };
	}
}

export async function getAllProducts(): Promise<{ products: ProductResult[]; error: null } | { products: null; error: string }> {
	try {
		// @ts-expect-error - Prisma client may need regeneration
		const products = await prisma.product.findMany({
			orderBy: { createdAt: "desc" },
		});

		return {
			products: products.map((product: { data: unknown; [key: string]: unknown }) => ({
				...product,
				data: product.data as Record<string, string | number>,
			})),
			error: null,
		};
	} catch (error) {
		console.error("Error fetching products:", error);
		return { products: null, error: "Failed to fetch products" };
	}
}

export async function getProductsByCategory(
	category: string
): Promise<{ products: ProductResult[]; error: null } | { products: null; error: string }> {
	try {
		// @ts-expect-error - Prisma client may need regeneration
		const products = await prisma.product.findMany({
			where: { category },
			orderBy: { createdAt: "desc" },
		});

		return {
			products: products.map((product: { data: unknown; [key: string]: unknown }) => ({
				...product,
				data: product.data as Record<string, string | number>,
			})),
			error: null,
		};
	} catch (error) {
		console.error("Error fetching products by category:", error);
		return { products: null, error: "Failed to fetch products" };
	}
}

export async function deleteProduct(
	productId: string
): Promise<{ success: true; error: null } | { success: false; error: string }> {
	try {
		// @ts-expect-error - Prisma client may need regeneration
		await prisma.product.delete({
			where: { id: productId },
		});

		return { success: true, error: null };
	} catch (error) {
		console.error("Error deleting product:", error);
		return { success: false, error: "Failed to delete product" };
	}
}

