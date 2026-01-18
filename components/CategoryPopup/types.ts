import { z } from "zod";

export type FieldType = "checkbox" | "range";

export const FIELD_TYPE_OPTIONS: { value: FieldType; label: string }[] = [
	{ value: "checkbox", label: "Checkbox" },
	{ value: "range", label: "Range" },
];

export interface DynamicField {
	id: string;
	name: string;
	type: FieldType;
}

export const categoryFormSchema = z.object({
	name: z.string().min(1, "Name is required"),
	icon: z.string().min(1, "Icon is required"),
	fields: z.array(
		z.object({
			id: z.string(),
			name: z.string().min(1, "Field name is required"),
			type: z.enum(["checkbox", "range"]),
		})
	),
});

export type CategoryFormData = z.infer<typeof categoryFormSchema>;

export interface CategoryPopupProps {
	children: React.ReactNode;
	onSuccess?: () => void;
}

