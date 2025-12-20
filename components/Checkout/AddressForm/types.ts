import { z } from "zod";

export const addressFormSchema = z.object({
	fullName: z.string().min(1, "Full name is required"),
	phone: z.string().min(1, "Phone is required"),
	email: z.string().email("Invalid email address").min(1, "Email is required"),
	city: z.string().min(1, "City/Village is required"),
	address: z.string().min(1, "Address is required"),
});

export type AddressFormData = z.infer<typeof addressFormSchema>;

