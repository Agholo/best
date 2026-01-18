/**
 * Generates a safe key from category name (for use in translation files)
 */
export function generateCategoryKey(categoryName: string): string {
	return categoryName
		.toLowerCase()
		.replace(/\s+/g, "_")
		.replace(/[^a-z0-9_]/g, "");
}

