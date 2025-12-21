"use client";

import { useCheckoutSteps } from "@/hooks/useCheckoutSteps";
import { RadioGroup } from "@/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { Activity } from "react";
import { useForm } from "react-hook-form";
import { PaymentDetailsData, paymentDetailsSchema } from "./types";
import PaymentMethodItem from "./PaymentMethodItem";
import CardFormFields from "./CardFormFields";
import useCheckout, { PaymentMethod } from "@/hooks/useCheckout";
import useCheckoutValidation from "@/hooks/useCheckoutValidation";
import { AVAILABLE_PAYMENT_METHODS, ALL_PAYMENT_METHODS } from "@/config/paymentMethods";
import { getMethodDescription, getMethodTitle } from "./data";
import { formatCardNumber, formatExpirationDate, formatCVV } from "@/utils/formatPayment";
import { usePaymentDetails } from "@/hooks/usePaymentDetails";

export default function PaymentDetails() {
	const { currentStep } = useCheckoutSteps();
	const { paymentMethod, setPaymentMethod, paymentDetails } = useCheckout();
	const { setPaymentFormValid } = useCheckoutValidation();

	const form = useForm<PaymentDetailsData>({
		resolver: zodResolver(paymentDetailsSchema),
		mode: "onChange",
		defaultValues: {
			nameOnCard: paymentDetails?.nameOnCard || "",
			cardNumber: paymentDetails?.cardNumber || "",
			expirationDate: paymentDetails?.expirationDate || "",
			cvv: paymentDetails?.cvv || "",
		},
	});

	const { register, formState: { errors }, setValue, trigger } = form;

	// Use custom hook for all useEffect logic
	usePaymentDetails({ form });

	const onSelectMethod = async (method: string): Promise<void> => {
		setPaymentMethod(method as PaymentMethod);
		// If switching away from card, mark form as valid (no validation needed)
		if (method !== "card") {
			setPaymentFormValid(true);
		} else {
			// If switching to card, trigger validation
			await trigger();
		}
	};

	const isMethodAvailable = (method: PaymentMethod): boolean => {
		return AVAILABLE_PAYMENT_METHODS.includes(method);
	};

	// Create formatting handlers with setValue
	const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		formatCardNumber(e, setValue);
	};

	const handleExpirationDateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		formatExpirationDate(e, setValue);
	};

	const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		formatCVV(e, setValue);
	};

	return (
		<Activity mode={currentStep.title === "Payment" ? "visible" : "hidden"}>
			<RadioGroup>
				{ALL_PAYMENT_METHODS.map((method) => {
					const isAvailable = isMethodAvailable(method);
					return (
						<PaymentMethodItem
							key={method}
							method={method}
							title={getMethodTitle(method)}
							description={getMethodDescription(method)}
							isSelected={paymentMethod === method}
							onSelect={onSelectMethod}
							isAvailable={isAvailable}
							unavailableMessage="payment.unavailable"
						>
							{method === "card" && (
								<CardFormFields
									register={register}
									errors={errors}
									onCardNumberChange={handleCardNumberChange}
									onExpirationDateChange={handleExpirationDateChange}
									onCVVChange={handleCVVChange}
								/>
							)}
						</PaymentMethodItem>
					);
				})}
			</RadioGroup>
		</Activity>
	);
}