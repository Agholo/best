import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(1, "Password is required"),
});

export const signupSchema = z.object({
	name: z.string().optional(),
	email: z.string().email("Invalid email address"),
	password: z
		.string()
		.min(6, "Password must be at least 6 characters")
		.regex(/[A-Z]/, "Password must contain at least one capital letter")
		.regex(/[a-z]/, "Password must contain at least one lowercase letter")
		.regex(/[0-9]/, "Password must contain at least one number")
		.regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
