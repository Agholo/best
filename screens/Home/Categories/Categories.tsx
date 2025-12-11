"use client";

import { useTranslation } from "react-i18next";
import Category from "./Category";
import { categories } from "./mock";
import Text from "@/ui/Text";

export default function Categories() {
	const { t } = useTranslation("categories");

	return (
		<div className="flex flex-col gap-8 w-full">
			<Text type="h1" size="2xl" weight="bold" letterSpacing="wide">
				{t("title")}
			</Text>
			<div className="flex gap-4 w-full">
				{categories.map(category => (
					<Category key={category.id} {...category} />
				))}
			</div>
		</div>
	)
}