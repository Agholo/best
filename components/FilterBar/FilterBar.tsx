"use client";

import useFilter from "@/hooks/useFilter";
import { Accordion } from "@/ui/Accordion";
import AccordionItem from "@/components/AccordionItem";
import { useState, useEffect, useMemo } from "react";
import { type CategoryField } from "@/utils/getCategoryFilterableFields";
import { Product } from "@/types/product";
import axios from "axios";
import CheckboxFilterField from "./CheckboxFilterField";
import RangeFilterField from "./RangeFilterField";

export default function FilterBar({ category }: { category: string }) {
	const [categoryFields, setCategoryFields] = useState<CategoryField[]>([]);
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchCategory = async (): Promise<void> => {
			try {
				const response = await axios.get(`/api/categories?name=${encodeURIComponent(category)}`);
				if (response.data?.category?.fields) {
					setCategoryFields(response.data.category.fields as CategoryField[]);
				}
			} catch (error) {
				console.error("Failed to fetch category:", error);
			}
		};

		fetchCategory();
	}, [category]);

	useEffect(() => {
		const fetchProducts = async (): Promise<void> => {
			try {
				const response = await axios.get(`/api/products?category=${encodeURIComponent(category)}`);
				if (response.data?.products) {
					setProducts(response.data.products as Product[]);
				}
			} catch (error) {
				console.error("Failed to fetch products:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, [category]);

	const { filters, setFilters, filterableFields } = useFilter(products, categoryFields);

	// Store range values for each range field
	const [rangeValues, setRangeValues] = useState<Record<string, { min: string; max: string }>>({});

	// Memoize range field names to avoid unnecessary recalculations
	const rangeFieldNames = useMemo(() => {
		return categoryFields.filter((field) => field.type === "range").map((field) => field.name);
	}, [categoryFields]);

	// Create a stable string representation of filters for range fields
	const rangeFiltersString = useMemo(() => {
		return rangeFieldNames.map((name) => `${name}:${filters[name] || ""}`).join("|");
	}, [rangeFieldNames, filters]);

	// Create a stable string representation of filterableFields for range fields
	const rangeFilterableFieldsString = useMemo(() => {
		return rangeFieldNames
			.map((name) => {
				const data = filterableFields[name] as { min: string; max: string } | undefined;
				return data ? `${name}:${data.min}-${data.max}` : "";
			})
			.join("|");
	}, [rangeFieldNames, filterableFields]);

	// Initialize and update range values only when category fields or range filters change
	useEffect(() => {
		const initialRangeValues: Record<string, { min: string; max: string }> = {};
		rangeFieldNames.forEach((fieldName) => {
			const currentRangeFilter = (filters[fieldName] as string) || "";
			const rangeData = filterableFields[fieldName] as { min: string; max: string } | undefined;

			if (currentRangeFilter && rangeData) {
				const [min, max] = currentRangeFilter.split("-");
				const clampedMax = Math.min(Number(max), Number(rangeData.max));
				const clampedMin = Math.max(Number(min), Number(rangeData.min));
				initialRangeValues[fieldName] = { min: String(clampedMin), max: String(clampedMax) };
			} else if (rangeData) {
				initialRangeValues[fieldName] = { min: rangeData.min, max: rangeData.max };
			} else {
				initialRangeValues[fieldName] = { min: "0", max: "1000" };
			}
		});

		// Only update if values actually changed
		setRangeValues((prev) => {
			const hasChanged = rangeFieldNames.some((fieldName) => {
				const newValue = initialRangeValues[fieldName];
				const oldValue = prev[fieldName];
				return !oldValue || oldValue.min !== newValue.min || oldValue.max !== newValue.max;
			});

			return hasChanged ? initialRangeValues : prev;
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rangeFieldNames, rangeFiltersString, rangeFilterableFieldsString]);

	const handleRangeChange = (fieldName: string, value: number[]): void => {
		setRangeValues((prev) => ({
			...prev,
			[fieldName]: { min: String(value[0]), max: String(value[1]) },
		}));
	};

	const handleRangeCommit = (fieldName: string, value: number[]): void => {
		setFilters({ [fieldName]: `${String(value[0])}-${String(value[1])}` });
	};

	const handleCheckboxChange = (filterKey: string, item: string, checked: boolean): void => {
		const currentFilter = filters[filterKey];
		const currentArray = Array.isArray(currentFilter) ? currentFilter : [];

		if (checked) {
			setFilters({ [filterKey]: [...currentArray, item] });
		} else {
			setFilters({ [filterKey]: currentArray.filter((val) => val !== item) });
		}
	};

	if (loading) {
		return (
			<aside className="w-1/3 h-full">
				<div>Loading filters...</div>
			</aside>
		);
	}

	const renderFilterField = (field: CategoryField, fieldName: string, value: string[] | { min: string; max: string }): React.ReactElement | null => {
		const currentFilter = filters[fieldName];

		switch (field.type) {
			case "checkbox":
				return (
					<CheckboxFilterField
						field={field}
						fieldName={fieldName}
						options={value as string[]}
						currentFilter={currentFilter}
						onChange={handleCheckboxChange}
					/>
				);

			case "range":
				const currentRangeValue = rangeValues[fieldName] || { min: (value as { min: string; max: string }).min, max: (value as { min: string; max: string }).max };
				return (
					<RangeFilterField
						field={field}
						fieldName={fieldName}
						range={value as { min: string; max: string }}
						currentValue={currentRangeValue}
						onChange={(val) => handleRangeChange(fieldName, val)}
						onCommit={(val) => handleRangeCommit(fieldName, val)}
					/>
				)

			default:
				return null;
		}
	};

	return (
		<aside className="w-1/3 h-full">
			<Accordion type="multiple">
				{Object.entries(filterableFields).map(([key, value]) => {
					const field = categoryFields.find((f) => f.name === key);
					if (!field) return null;

					return (
						<AccordionItem title={key} key={key}>
							{renderFilterField(field, key, value)}
						</AccordionItem>
					);
				})}
			</Accordion>
		</aside>
	);
}
