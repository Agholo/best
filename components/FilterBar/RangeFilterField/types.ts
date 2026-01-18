import { CategoryField } from "@/utils/getCategoryFilterableFields";

export interface RangeFilterFieldProps {
	field: CategoryField;
	fieldName: string;
	range: { min: string; max: string };
	currentValue: { min: string; max: string };
	onChange: (value: number[]) => void;
	onCommit: (value: number[]) => void;
}

