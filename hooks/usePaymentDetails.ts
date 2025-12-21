import { useEffect } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";
import { PaymentDetailsData } from "@/components/Checkout/PaymentDetails/types";
import useCheckout, { PaymentMethod } from "@/hooks/useCheckout";
import useCheckoutValidation from "@/hooks/useCheckoutValidation";
import { AVAILABLE_PAYMENT_METHODS } from "@/config/paymentMethods";

interface UsePaymentDetailsProps {
	form: UseFormReturn<PaymentDetailsData>;
}

export function usePaymentDetails({ form }: UsePaymentDetailsProps): void {
	const { paymentMethod, setPaymentMethod, setPaymentDetails } = useCheckout();
	const { setPaymentFormValid } = useCheckoutValidation();
	const { control, formState: { isValid }, trigger } = form;

	const nameOnCard = useWatch({ control, name: "nameOnCard" });
	const cardNumber = useWatch({ control, name: "cardNumber" });
	const expirationDate = useWatch({ control, name: "expirationDate" });
	const cvv = useWatch({ control, name: "cvv" });

	// Set default payment method to first available if not set or if current method is unavailable
	useEffect(() => {
		if (!paymentMethod || !AVAILABLE_PAYMENT_METHODS.includes(paymentMethod)) {
			const firstAvailable = AVAILABLE_PAYMENT_METHODS[0];
			if (firstAvailable) {
				setPaymentMethod(firstAvailable);
			}
		}
	}, [paymentMethod, setPaymentMethod]);

	// Initialize and update validation state based on payment method
	useEffect(() => {
		if (paymentMethod && paymentMethod !== "card") {
			// Non-card payment methods don't need validation
			setPaymentFormValid(true);
		} else if (paymentMethod === "card") {
			// For card payment, use form validation state
			setPaymentFormValid(isValid);
		}
	}, [isValid, paymentMethod, setPaymentFormValid]);

	// Trigger validation when payment method changes to card (e.g., from storage)
	useEffect(() => {
		if (paymentMethod === "card") {
			trigger();
		}
	}, [paymentMethod, trigger]);

	// Save card details onChange when payment method is card
	useEffect(() => {
		if (paymentMethod === "card") {
			const formData: PaymentDetailsData = {
				nameOnCard: nameOnCard || "",
				cardNumber: cardNumber || "",
				expirationDate: expirationDate || "",
				cvv: cvv || "",
			};
			// Save to store even if validation fails (user is still typing)
			setPaymentDetails(formData);
		}
	}, [nameOnCard, cardNumber, expirationDate, cvv, paymentMethod, setPaymentDetails]);
}

