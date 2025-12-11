import CategoryScreen from "@/screens/Category";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug: category } = await params;

	return <CategoryScreen category={category} />
}
