import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/ui/Breadcrumb";
import Link from "next/link";
import Text from "@/ui/Text";
import FilterBar from "@/components/FilterBar/FilterBar";
import ProductList from "@/components/ProductList/ProductList";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug: category } = await params;

	return (
		<div>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href="/home">Home</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href="/categories">Categories</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{category}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<Text size="3xl" textTransform="capitalize">{category}</Text>
			<div className="flex gap-4 w-full h-full">
				<FilterBar category={category} />
				<ProductList category={category} />
			</div>
		</div>
	);
}
