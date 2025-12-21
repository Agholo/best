"use client";

import { useTranslation } from "react-i18next";
import Category from "./Category";
import { categories } from "./mock";
import Text from "@/ui/Text";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/ui/carousel";

export default function Categories() {
	const { t } = useTranslation("categories");

	return (
		<div className="flex flex-col gap-8 w-full">
			<Text type="h1" size="2xl" weight="bold" letterSpacing="wide">
				{t("title")}
			</Text>
			<Carousel
				opts={{
					align: "start",
					loop: true,
				}}
				className="w-full"
			>
				<CarouselContent className="-ml-2 md:-ml-4">
					{categories.map(category => (
						<CarouselItem key={category.id} className="pl-2 md:pl-4 basis-[20%]">
							<Category {...category} />
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	)
}

