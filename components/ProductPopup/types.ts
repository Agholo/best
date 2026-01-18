import { z } from "zod";

export const productFormSchema = z.object({
	name: z.string().min(1, "Name is required"),
	description: z.string().min(1, "Description is required"),
	image: z.string().url("Must be a valid URL").min(1, "Image URL is required"),
	stock: z.number().min(0, "Stock must be 0 or greater"),
	category: z.string().min(1, "Category is required"),
	filterableFields: z.record(z.string(), z.string()).refine(
		(fields) => {
			// This will be validated dynamically based on category fields
			return true;
		},
		{ message: "All category fields are required" }
	),
	additionalFields: z.record(z.string(), z.string()).optional(),
});

export type ProductFormData = z.infer<typeof productFormSchema>;

export interface ProductPopupProps {
	children: React.ReactNode;
	category: string;
	onSuccess?: () => void;
}

