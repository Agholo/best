import { z } from "zod";
import { luhnCheck, validateExpirationDate } from "@/utils/validatePayment";

export const paymentDetailsSchema = z.object({
	nameOnCard: z
		.string()
		.min(1, "Name on card is required")
		.min(2, "Name must be at least 2 characters")
		.regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
	cardNumber: z
		.string()
		.min(1, "Card number is required")
		.regex(/^[\d\s]+$/, "Card number must contain only digits")
		.refine((val) => {
			const digits = val.replace(/\s/g, '');
			return digits.length >= 13 && digits.length <= 19;
		}, "Card number must be between 13 and 19 digits")
		.refine((val) => {
			const digits = val.replace(/\s/g, '');
			return luhnCheck(digits);
		}, "Invalid card number"),
	expirationDate: z
		.string()
		.min(1, "Expiration date is required")
		.regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiration date must be in MM/YY format")
		.refine((val) => validateExpirationDate(val), "Card has expired or invalid date"),
	cvv: z
		.string()
		.min(1, "CVV/CVC is required")
		.regex(/^\d+$/, "CVV must contain only digits")
		.refine((val) => val.length === 3 || val.length === 4, "CVV must be 3 or 4 digits"),
});

export type PaymentDetailsData = z.infer<typeof paymentDetailsSchema>;
