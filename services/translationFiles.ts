import { promises as fs } from "fs";
import path from "path";

const LOCALES_DIR = path.join(process.cwd(), "public", "locales");
const SUPPORTED_LANGUAGES = ["en", "am", "ru"];

/**
 * Reads the current categories translation file for a language
 */
async function readCategoriesFile(lang: string): Promise<Record<string, string>> {
	try {
		const filePath = path.join(LOCALES_DIR, lang, "categories.json");
		const fileContent = await fs.readFile(filePath, "utf-8");
		return JSON.parse(fileContent);
	} catch (error) {
		console.error(`Error reading categories file for ${lang}:`, error);
		return {};
	}
}

/**
 * Writes translations to the categories translation file for a language
 */
async function writeCategoriesFile(
	lang: string,
	translations: Record<string, string>
): Promise<void> {
	try {
		const filePath = path.join(LOCALES_DIR, lang, "categories.json");
		// Ensure directory exists
		await fs.mkdir(path.dirname(filePath), { recursive: true });
		// Write file with pretty formatting
		await fs.writeFile(filePath, JSON.stringify(translations, null, "\t") + "\n", "utf-8");
	} catch (error) {
		console.error(`Error writing categories file for ${lang}:`, error);
		throw error;
	}
}

/**
 * Adds a category translation to all language files
 * @param categoryKey - The key for the category (e.g., "smartphones")
 * @param translations - Object with translations for each language { en: "...", am: "...", ru: "..." }
 */
export async function addCategoryTranslation(
	categoryKey: string,
	translations: Record<string, string>
): Promise<{ success: boolean; error?: string }> {
	try {
		// Update each language file
		const updatePromises = SUPPORTED_LANGUAGES.map(async (lang) => {
			const currentTranslations = await readCategoriesFile(lang);
			const translation = translations[lang] || translations.en || "";

			// Add the new category translation
			const updatedTranslations = {
				...currentTranslations,
				[categoryKey]: translation,
			};

			await writeCategoriesFile(lang, updatedTranslations);
		});

		await Promise.all(updatePromises);

		return { success: true };
	} catch (error) {
		console.error("Error adding category translation:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Failed to add translation",
		};
	}
}

/**
 * Generates a safe key from category name (for use in translation files)
 */
export function generateCategoryKey(categoryName: string): string {
	return categoryName
		.toLowerCase()
		.replace(/\s+/g, "_")
		.replace(/[^a-z0-9_]/g, "");
}

