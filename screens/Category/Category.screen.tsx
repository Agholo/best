"use client";

import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/ui/Breadcrumb";
import Link from "next/link";
import Text from "@/ui/Text";
import FilterBar from "@/components/FilterBar/FilterBar";
import ProductList from "@/components/ProductList/ProductList";
import { useTranslation } from "react-i18next";
import { generateCategoryKey } from "@/utils/generateCategoryKey";

export default function CategoryScreen({ category }: { category: string }) {
	const { t: tCategory } = useTranslation("category");
	const { t: tCategories } = useTranslation("categories");
	const translationKey = `db_${generateCategoryKey(category)}`;
	const translatedCategory = tCategories(translationKey, { defaultValue: category });

	return (
		<div>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href="/home">{tCategory("breadcrumb.home")}</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href="/categories">{tCategory("breadcrumb.categories")}</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{translatedCategory}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<Text size="3xl" textTransform="capitalize">{translatedCategory}</Text>
			<Text type="h1" size="2xl" weight="bold">{tCategory("filters")}</Text>
			<div className="flex gap-4 w-full h-full">
				<FilterBar category={category} />
				<ProductList category={category} />
			</div>
		</div>
	);
}