"use client";

import useFilter from "@/hooks/useFilter";
import { Accordion } from "@/ui/Accordion";
import AccordionItem from "@/components/AccordionItem";
import { Label } from "@/ui/label";
import { Checkbox } from "@/ui/Checkbox";
import { Slider } from "@/ui/slider";
import { useState } from "react";
import { Product as ProductType } from "@/types/product";
import { getProductsByCategory } from "@/utils/getProductsByCategory";
import { products as mockProducts } from "@/mock/products";

export default function FilterBar({ category }: { category: string }) {
	const products = getProductsByCategory(mockProducts, category);
	const { filters, setFilters, filterableFields } = useFilter(products);
	console.log(filters);
	const currentPriceFilter = filters.price || "";
	console.log(products);
	const getPriceFromFilter = (): { min: string; max: string } => {
		console.log(filterableFields.price);
		if (currentPriceFilter) {
			const [min, max] = currentPriceFilter.split("-");
			return { min, max };
		}
		return { min: filterableFields.price.min, max: filterableFields.price.max };
	};
	const [price, setPrice] = useState<{ min: string; max: string }>(getPriceFromFilter);

	const handlePriceChange = (value: number[]): void => {
		setPrice({ min: String(value[0]), max: String(value[1]) });
	};

	const handlePriceCommit = (value: number[]): void => {
		setFilters({ price: `${String(value[0])}-${String(value[1])}` });
	};

	const handleCheckboxChange = (filterKey: keyof ProductType["filterable"], item: string, checked: boolean): void => {
		const currentFilter = filters[filterKey];
		const currentArray = Array.isArray(currentFilter) ? currentFilter : [];
		
		if (checked) {
			setFilters({ [filterKey]: [...currentArray, item] });
		} else {
			setFilters({ [filterKey]: currentArray.filter((val) => val !== item) });
		}
	};

	return (
		<aside className="w-1/3 h-full">
			<h1>Filters</h1>
			<Accordion type="multiple">
				{Object.entries(filterableFields).map(([key, value]) => {
					const filterKey = key as keyof ProductType["filterable"];
					const currentFilter = filters[filterKey];
					const isChecked = (item: string): boolean => {
						if (filterKey === "price") return false;
						return Array.isArray(currentFilter) && currentFilter.includes(item);
					};

					return (
						<AccordionItem title={key} key={key}>
							{Array.isArray(value) ? (
								value.map((item) => (
									<div key={item} className="flex items-center gap-2 my-2">
										<Checkbox
											id={`${key}-${item}`}
											checked={isChecked(item)}
											onCheckedChange={(checked) => handleCheckboxChange(filterKey, item, checked === true)}
										/>
										<Label htmlFor={`${key}-${item}`}>{item}</Label>
									</div>
								))
							) : (
								<div key={key}>
									<Slider
										value={[Number(price.min), Number(price.max)]}
										min={Number(value.min)}
										max={Number(value.max)}
										onValueChange={handlePriceChange}
										onValueCommit={handlePriceCommit}
									/>
									<div className="flex items-center justify-between my-2">
										<p>{price.min}</p>
										<p>{price.max}</p>
									</div>
								</div>
							)}
						</AccordionItem>
					);
				})}
			</Accordion>
		</aside>
	);
}
