import { prisma } from "@/lib/prisma";

// Prefix for database translations to distinguish from local file translations
const DB_TRANSLATION_PREFIX = "db_";

export interface TranslationData {
	key: string;
	namespace?: string;
	values: Record<string, string>; // { en: "...", am: "...", ru: "..." }
}

/**
 * Adds the database prefix to a translation key
 */
export function addDbPrefix(key: string): string {
	if (key.startsWith(DB_TRANSLATION_PREFIX)) {
		return key;
	}
	return `${DB_TRANSLATION_PREFIX}${key}`;
}

/**
 * Removes the database prefix from a translation key
 */
export function removeDbPrefix(key: string): string {
	if (key.startsWith(DB_TRANSLATION_PREFIX)) {
		return key.slice(DB_TRANSLATION_PREFIX.length);
	}
	return key;
}

export interface TranslationResult {
	success: boolean;
	translation?: {
		id: string;
		key: string;
		namespace: string;
		values: Record<string, string>;
	};
	error?: string;
}

/**
 * Creates or updates a translation in the database
 */
export async function upsertTranslation(
	data: TranslationData
): Promise<TranslationResult> {
	try {
		const namespace = data.namespace || "categories";
		// Add prefix to key when storing in database
		const prefixedKey = addDbPrefix(data.key);

		const translation = await prisma.translation.upsert({
			where: {
				key: prefixedKey,
			},
			update: {
				values: data.values as unknown as Record<string, unknown>,
			},
			create: {
				key: prefixedKey,
				namespace,
				values: data.values as unknown as Record<string, unknown>,
			},
		});

		return {
			success: true,
			translation: {
				id: translation.id,
				key: translation.key,
				namespace: translation.namespace,
				values: translation.values as Record<string, string>,
			},
		};
	} catch (error) {
		console.error("Error upserting translation:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Failed to upsert translation",
		};
	}
}

/**
 * Gets all translations for a namespace and language
 * Returns format: { key: translatedValue }
 */
export async function getTranslationsForLanguage(
	namespace: string = "categories",
	language: string = "en"
): Promise<{ translations: Record<string, string>; error: null } | { translations: null; error: string }> {
	try {
		const translations = await prisma.translation.findMany({
			where: {
				namespace,
			},
		});

		// Convert to i18n format: { key: translatedValue }
		// Keep the db_ prefix in the returned keys so we know they're from database
		const result: Record<string, string> = {};
		for (const translation of translations) {
			const values = translation.values as Record<string, string>;
			// Use the requested language, fallback to 'en', then to key itself
			// Keep the prefix in the key so it's identifiable as a DB translation
			result[translation.key] = values[language] || values.en || removeDbPrefix(translation.key);
		}

		return {
			translations: result,
			error: null,
		};
	} catch (error) {
		console.error("Error fetching translations for language:", error);
		return {
			translations: null,
			error: error instanceof Error ? error.message : "Failed to fetch translations",
		};
	}
}

/**
 * Deletes a translation by key
 */
export async function deleteTranslation(
	key: string
): Promise<{ success: true; error: null } | { success: false; error: string }> {
	try {
		// Add prefix to key when deleting from database
		const prefixedKey = addDbPrefix(key);
		await prisma.translation.delete({
			where: {
				key: prefixedKey,
			},
		});

		return { success: true, error: null };
	} catch (error) {
		console.error("Error deleting translation:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Failed to delete translation",
		};
	}
}
