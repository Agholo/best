import { UseFormSetValue } from "react-hook-form";
import { PaymentDetailsData } from "@/components/Checkout/PaymentDetails/types";

export const formatCardNumber = (
	e: React.ChangeEvent<HTMLInputElement>,
	setValue: UseFormSetValue<PaymentDetailsData>
): void => {
	const input = e.target;
	const digits = input.value.replace(/\D/g, '');
	const limited = digits.slice(0, 19); // Support up to 19 digits for all card types
	const formatted = limited.replace(/(\d{4})(?=\d)/g, '$1 ');

	input.value = formatted;
	// Update form value after formatting
	setValue("cardNumber", formatted, { shouldValidate: true });
};

export const formatExpirationDate = (
	e: React.ChangeEvent<HTMLInputElement>,
	setValue: UseFormSetValue<PaymentDetailsData>
): void => {
	const input = e.target;
	const value = input.value.replace(/\D/g, '');
	const limited = value.slice(0, 4);

	let formatted = limited;
	if (limited.length >= 2) {
		formatted = limited.slice(0, 2) + '/' + limited.slice(2);
	}

	input.value = formatted;
	// Update form value after formatting
	setValue("expirationDate", formatted, { shouldValidate: true });
};

export const formatCVV = (
	e: React.ChangeEvent<HTMLInputElement>,
	setValue: UseFormSetValue<PaymentDetailsData>
): void => {
	const input = e.target;
	const digits = input.value.replace(/\D/g, '');
	const limited = digits.slice(0, 4);
	input.value = limited;
	// Update form value after formatting
	setValue("cvv", limited, { shouldValidate: true });
};

