import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { deleteProduct } from "@/services/product";

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
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

		const { id: productId } = await params;

		if (!productId) {
			return NextResponse.json(
				{ error: "Product ID is required" },
				{ status: 400 }
			);
		}

		const result = await deleteProduct(productId);

		if (result.error) {
			return NextResponse.json(
				{ error: result.error },
				{ status: 400 }
			);
		}

		return NextResponse.json(
			{ message: "Product deleted successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Product deletion error:", error);

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

