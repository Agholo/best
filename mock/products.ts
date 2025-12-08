import { faker } from "@faker-js/faker";

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

export const products = Array.from({ length: 100 }, () => ({
	id: faker.string.uuid(),
	name: faker.commerce.productName(),
	description: faker.commerce.productDescription(),
	image: faker.image.url({
		width: 300,
		height: 300,
	}),
	stock: faker.number.int({ min: 0, max: 3000 }),
	category: faker.helpers.arrayElement(categories),
	filterable: {
		brand: faker.helpers.arrayElement(brands),
		price: faker.commerce.price(),
		RAM: faker.helpers.arrayElement(ram),
	},
}));
