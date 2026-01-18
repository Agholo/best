import { NextRequest, NextResponse } from "next/server";
import {
	createCategory,
	getAllCategories,
	getCategoryByName,
	deleteCategory,
} from "@/services/category";
import { categoryFormSchema } from "@/components/CategoryPopup/types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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
		const { name, icon, fields } = body;

		// Validate input using zod schema
		const validationResult = categoryFormSchema.safeParse({
			name,
			icon,
			fields: fields || [],
		});

		if (!validationResult.success) {
			const firstError = validationResult.error.issues[0];
			return NextResponse.json(
				{ error: firstError.message },
				{ status: 400 }
			);
		}

		// Create category with validated data
		const validatedData = validationResult.data;
		const result = await createCategory({
			name: validatedData.name,
			icon: validatedData.icon,
			fields: validatedData.fields,
		});

		if (result.error) {
			return NextResponse.json(
				{ error: result.error },
				{ status: 400 }
			);
		}

		return NextResponse.json(
			{ message: "Category created successfully", category: result.category },
			{ status: 201 }
		);
	} catch (error) {
		console.error("Category creation error:", error);

		// Log the full error for debugging
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
		const name = searchParams.get("name");

		// If name query parameter is provided, get category by name
		if (name) {
			const result = await getCategoryByName(name);

			if (result.error) {
				return NextResponse.json(
					{ error: result.error },
					{ status: 404 }
				);
			}

			return NextResponse.json(
				{ category: result.category },
				{ status: 200 }
			);
		}

		// Otherwise, get all categories
		const result = await getAllCategories();

		if (result.error) {
			return NextResponse.json(
				{ error: result.error },
				{ status: 500 }
			);
		}

		return NextResponse.json(
			{ categories: result.categories },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Category fetch error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}

export async function DELETE(request: NextRequest) {
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

		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id");

		if (!id) {
			return NextResponse.json(
				{ error: "Category ID is required" },
				{ status: 400 }
			);
		}

		const result = await deleteCategory(id);

		if (result.error) {
			return NextResponse.json(
				{ error: result.error },
				{ status: result.error === "Category not found" ? 404 : 400 }
			);
		}

		return NextResponse.json(
			{ message: "Category deleted successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Category deletion error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}

