import { faker } from "@faker-js/faker";
import { CategoryField } from "@/utils/getCategoryFilterableFields";

const brands = [
	"apple",
	"samsung",
	"google",
	"microsoft",
	"lenovo",
	"dell",
	"hp",
];

const categories = [
	"smartphones",
	"laptops",
	"tablets",
	"gaming",
	"headphones",
	"cameras",
];

const ram = [
	"4GB",
	"8GB",
	"16GB",
	"32GB",
	"64GB",
];

// Category field definitions - these should match what's in your database
// You can update these to match your actual category field definitions
const categoryFieldsMap: Record<string, CategoryField[]> = {
	smartphones: [
		{ id: "1", name: "brand", type: "checkbox" },
		{ id: "2", name: "price", type: "range" },
		{ id: "3", name: "RAM", type: "checkbox" },
	],
	laptops: [
		{ id: "1", name: "brand", type: "checkbox" },
		{ id: "2", name: "price", type: "range" },
		{ id: "3", name: "RAM", type: "checkbox" },
	],
	tablets: [
		{ id: "1", name: "brand", type: "checkbox" },
		{ id: "2", name: "price", type: "range" },
		{ id: "3", name: "RAM", type: "checkbox" },
	],
	gaming: [
		{ id: "1", name: "brand", type: "checkbox" },
		{ id: "2", name: "price", type: "range" },
		{ id: "3", name: "RAM", type: "checkbox" },
	],
	headphones: [
		{ id: "1", name: "brand", type: "checkbox" },
		{ id: "2", name: "price", type: "range" },
	],
	cameras: [
		{ id: "1", name: "brand", type: "checkbox" },
		{ id: "2", name: "price", type: "range" },
	],
};

// Helper function to generate appropriate values based on field name and type
function generateFieldValue(field: CategoryField): string {
	if (field.type === "range") {
		// For range fields, generate a price
		return faker.commerce.price({ min: 10, max: 2000 });
	}

	// For checkbox/string fields, generate values based on common field names
	const fieldNameLower = field.name.toLowerCase();

	if (fieldNameLower.includes("brand")) {
		return faker.helpers.arrayElement(brands);
	}

	if (fieldNameLower.includes("ram") || fieldNameLower.includes("memory")) {
		return faker.helpers.arrayElement(ram);
	}

	if (fieldNameLower.includes("color") || fieldNameLower.includes("color")) {
		return faker.color.human();
	}

	if (fieldNameLower.includes("storage")) {
		return faker.helpers.arrayElement(["64GB", "128GB", "256GB", "512GB", "1TB"]);
	}

	// For any other field name, generate a realistic value
	// Use faker to generate appropriate data based on the field name
	return faker.helpers.arrayElement([
		faker.commerce.productAdjective(),
		faker.commerce.productMaterial(),
		faker.lorem.word(),
	]);
}

function generateFilterableFields(category: string): Record<string, string> {
	const fields = categoryFieldsMap[category] || [];
	const filterableFields: Record<string, string> = {};

	fields.forEach((field) => {
		filterableFields[field.name] = generateFieldValue(field);
	});

	return filterableFields;
}

export const products = Array.from({ length: 100 }, () => {
	const category = faker.helpers.arrayElement(categories);
	const filterableFields = generateFilterableFields(category);

	return {
		id: faker.string.uuid(),
		name: faker.commerce.productName(),
		description: faker.commerce.productDescription(),
		image: faker.image.url({
			width: 300,
			height: 300,
		}),
		stock: faker.number.int({ min: 0, max: 3000 }),
		category,
		...filterableFields,
	};
});
