import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CategoryFormData, DynamicField } from "../types";

export interface CategoryFieldProps {
	field: DynamicField;
	index: number;
	register: UseFormRegister<CategoryFormData>;
	errors: FieldErrors<CategoryFormData>;
	onRemove: (index: number) => void;
}
