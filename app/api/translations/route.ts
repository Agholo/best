import { NextRequest, NextResponse } from "next/server";
import { getTranslationsForLanguage } from "@/services/translationDb";

/**
 * GET /api/translations?namespace=categories&lang=en
 * Returns translations for a specific namespace and language
 */
export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const namespace = searchParams.get("namespace") || "categories";
		const lang = searchParams.get("lang") || "en";

		// Validate language
		const supportedLanguages = ["en", "am", "ru"];
		if (!supportedLanguages.includes(lang)) {
			return NextResponse.json(
				{ error: `Unsupported language: ${lang}. Supported languages: ${supportedLanguages.join(", ")}` },
				{ status: 400 }
			);
		}

		const result = await getTranslationsForLanguage(namespace, lang);

		if (result.error) {
			return NextResponse.json(
				{ error: result.error },
				{ status: 500 }
			);
		}

		return NextResponse.json(
			result.translations,
			{ status: 200 }
		);
	} catch (error) {
		console.error("Translation fetch error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}

