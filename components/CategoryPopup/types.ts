import { z } from "zod";

export type FieldType = "string" | "checkbox" | "range";

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
			type: z.enum(["string", "checkbox", "range"]),
		})
	),
});

export type CategoryFormData = z.infer<typeof categoryFormSchema>;

export interface CategoryPopupProps {
	children: React.ReactNode;
	onSuccess?: () => void;
}

