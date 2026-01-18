import { CategoryField } from "@/utils/getCategoryFilterableFields";

export interface CheckboxFilterFieldProps {
	field: CategoryField;
	fieldName: string;
	options: string[];
	currentFilter: string | string[] | undefined;
	onChange: (fieldKey: string, item: string, checked: boolean) => void;
}

