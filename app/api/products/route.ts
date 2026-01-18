import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { productFormSchema } from "@/components/ProductPopup/types";
import { createProduct, getAllProducts, getProductsByCategory } from "@/services/product";

export async function POST(request: NextRequest) {
	try {
		// Check authentication
		const session = await getServerSession(authOptions);
		if (!session) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 }
			);
		}

		// Check if user is admin
		if (session.user.role !== "admin") {
			return NextResponse.json(
				{ error: "Forbidden: Admin access required" },
				{ status: 403 }
			);
		}

		const body = await request.json();
		const { name, description, image, stock, category, filterableFields, additionalFields } = body;

		// Validate input using zod schema
		const validationResult = productFormSchema.safeParse({
			name,
			description,
			image,
			stock,
			category,
			filterableFields: filterableFields || {},
			additionalFields: additionalFields || {},
		});

		if (!validationResult.success) {
			const firstError = validationResult.error.issues[0];
			return NextResponse.json(
				{ error: firstError.message },
				{ status: 400 }
			);
		}

		const result = await createProduct({
			name: validationResult.data.name,
			description: validationResult.data.description,
			image: validationResult.data.image,
			stock: validationResult.data.stock,
			category: validationResult.data.category,
			filterableFields: validationResult.data.filterableFields,
			additionalFields: validationResult.data.additionalFields,
		});

		if (result.error) {
			console.error("Product creation failed:", result.error);
			return NextResponse.json(
				{ error: result.error },
				{ status: 400 }
			);
		}

		return NextResponse.json(
			{ message: "Product created successfully", product: result.product },
			{ status: 201 }
		);
	} catch (error) {
		console.error("Product creation error:", error);

		if (error instanceof Error) {
			console.error("Error details:", {
				message: error.message,
				stack: error.stack,
			});
		}

		return NextResponse.json(
			{
				error: error instanceof Error ? error.message : "Internal server error"
			},
			{ status: 500 }
		);
	}
}

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const category = searchParams.get("category");

		if (category) {
			const result = await getProductsByCategory(category);
			if (result.error) {
				return NextResponse.json(
					{ error: result.error },
					{ status: 500 }
				);
			}

			// Transform products to match Product type
			const products = result.products?.map((product) => ({
				id: product.id,
				name: product.name,
				description: product.description,
				image: product.image,
				stock: product.stock,
				category: product.category,
				...product.data,
			}));

			return NextResponse.json(
				{ products },
				{ status: 200 }
			);
		}

		const result = await getAllProducts();
		if (result.error) {
			return NextResponse.json(
				{ error: result.error },
				{ status: 500 }
			);
		}

		// Transform products to match Product type
		const products = result.products?.map((product) => ({
			id: product.id,
			name: product.name,
			description: product.description,
			image: product.image,
			stock: product.stock,
			category: product.category,
			...product.data,
		}));

		return NextResponse.json(
			{ products },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Product fetch error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}

