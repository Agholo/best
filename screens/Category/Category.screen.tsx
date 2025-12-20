"use client";

import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/ui/Breadcrumb";
import Link from "next/link";
import Text from "@/ui/Text";
import FilterBar from "@/components/FilterBar/FilterBar";
import ProductList from "@/components/ProductList/ProductList";
import { useTranslation } from "react-i18next";

export default function CategoryScreen({ category }: { category: string }) {
	const { t } = useTranslation("category");

	return (
		<div>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href="/home">{t("breadcrumb.home")}</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href="/categories">{t("breadcrumb.categories")}</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{category}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<Text size="3xl" textTransform="capitalize">{category}</Text>
			<Text type="h1" size="2xl" weight="bold">{t("filters")}</Text>
			<div className="flex gap-4 w-full h-full">
				<FilterBar category={category} />
				<ProductList category={category} />
			</div>
		</div>
	);
}