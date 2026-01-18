// Google Translate API service for translating text
// This service handles automatic translation using Google Translate API

// Map our language codes to Google Translate language codes
const LANGUAGE_MAP: Record<string, string> = {
	en: "en",
	am: "hy", // Armenian
	ru: "ru",
};

export interface TranslationResult {
	success: boolean;
	sourceLanguage?: string;
	translations?: Record<string, string>;
	error?: string;
}

/**
 * Detects the language of the input text using Google Translate API
 */
async function detectLanguage(text: string): Promise<string | null> {
	try {
		const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;

		if (!apiKey) {
			console.warn("GOOGLE_TRANSLATE_API_KEY not set, skipping language detection");
			return null;
		}

		const response = await fetch(
			`https://translation.googleapis.com/language/translate/v2/detect?key=${apiKey}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					q: text,
				}),
			}
		);

		if (!response.ok) {
			console.error("Language detection failed:", response.statusText);
			return null;
		}

		const data = await response.json();
		const detectedLang = data.data?.detections?.[0]?.[0]?.language;

		if (detectedLang) {
			// Map Google's language code back to our code
			const ourLang = Object.entries(LANGUAGE_MAP).find(
				([, googleCode]) => googleCode === detectedLang
			)?.[0];
			return ourLang || detectedLang;
		}

		return null;
	} catch (error) {
		console.error("Error detecting language:", error);
		return null;
	}
}

/**
 * Translates text to multiple target languages using Google Translate API with auto-detection
 * @param text - The text to translate (language will be auto-detected)
 * @param targetLanguages - Array of language codes to translate to (e.g., ["am", "ru"])
 * @returns Object with translations for each language and detected source language
 */
export async function translateText(
	text: string,
	targetLanguages: string[] = ["am", "ru", "en"]
): Promise<TranslationResult> {
	try {
		const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;

		if (!apiKey) {
			console.warn("GOOGLE_TRANSLATE_API_KEY not set, skipping translation");
			return {
				success: false,
				error: "Google Translate API key not configured",
			};
		}

		// Detect source language
		const sourceLang = await detectLanguage(text);
		if (!sourceLang) {
			// If detection fails, assume English
			console.warn("Language detection failed, assuming English");
		}

		const languagesToTranslate = targetLanguages.filter((lang) => lang !== sourceLang);

		// Translate to each target language
		const translations: Record<string, string> = {};
		if (sourceLang) {
			translations[sourceLang] = text; // Original text for source language
		}

		// Translate in parallel for better performance
		const translationPromises = languagesToTranslate.map(async (targetLang) => {
			const googleLangCode = LANGUAGE_MAP[targetLang] || targetLang;

			try {
				const response = await fetch(
					`https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							q: text,
							target: googleLangCode,
							format: "text",
						}),
					}
				);

				if (!response.ok) {
					console.error(`Translation to ${targetLang} failed:`, response.statusText);
					return { lang: targetLang, text: text }; // Fallback to original
				}

				const data = await response.json();
				if (data?.data?.translations?.[0]?.translatedText) {
					return {
						lang: targetLang,
						text: data.data.translations[0].translatedText,
					};
				}

				return { lang: targetLang, text: text }; // Fallback to original
			} catch (error) {
				console.error(`Error translating to ${targetLang}:`, error);
				return { lang: targetLang, text: text }; // Fallback to original
			}
		});

		const results = await Promise.all(translationPromises);
		for (const result of results) {
			if (result.text) {
				translations[result.lang] = result.text;
			}
		}

		// Check if we got at least one translation
		const hasTranslations = Object.keys(translations).length > 1; // More than just the source language

		if (hasTranslations) {
			return {
				success: true,
				sourceLanguage: sourceLang || "en",
				translations,
			};
		}

		// If no translations were successful, return failure
		return {
			success: false,
			error: "No translations were generated",
		};
	} catch (error) {
		console.error("Translation error:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Translation failed",
		};
	}
}

/**
 * Translates category name to all supported languages with auto-detection
 * @param categoryName - The category name (can be in English, Armenian, or Russian)
 * @returns Translations for all supported languages (en, am, ru)
 */
export async function translateCategoryName(
	categoryName: string
): Promise<Record<string, string>> {
	// Request translations for all languages - the function will auto-detect source and translate to others
	const targetLanguages = ["en", "am", "ru"];

	try {
		const result = await translateText(categoryName, targetLanguages);

		// If translation succeeded and we have translations for all languages, return them
		if (result.success && result.translations) {
			// Ensure we have translations for all three languages
			const translations: Record<string, string> = {
				en: result.translations.en || categoryName,
				am: result.translations.am || categoryName,
				ru: result.translations.ru || categoryName,
			};

			// If we have at least one translation (besides the original), return it
			// Otherwise, fall through to use the same text for all
			const hasTranslations =
				(result.translations.en && result.translations.en !== categoryName) ||
				(result.translations.am && result.translations.am !== categoryName) ||
				(result.translations.ru && result.translations.ru !== categoryName);

			if (hasTranslations) {
				return translations;
			}
		}
	} catch (error) {
		console.error("Translation error in translateCategoryName:", error);
	}

	// Fallback: if translation fails or returns no valid translations, use same text for all languages
	console.warn(`Translation failed for "${categoryName}", using same text for all languages`);
	return {
		en: categoryName,
		am: categoryName,
		ru: categoryName,
	};
}
