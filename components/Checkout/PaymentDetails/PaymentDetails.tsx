"use client";

import { useCheckoutSteps } from "@/hooks/useCheckoutSteps";
import { RadioGroup } from "@/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { Activity, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { PaymentDetailsData, paymentDetailsSchema } from "./types";
import PaymentMethodItem from "./PaymentMethodItem";
import CardFormFields from "./CardFormFields";
import { useTranslation } from "react-i18next";
import useCheckout, { PaymentMethod } from "@/hooks/useCheckout";

export default function PaymentDetails() {
	const { currentStep } = useCheckoutSteps();
	const { t } = useTranslation("checkout");
	const { paymentMethod, setPaymentMethod, setPaymentDetails, paymentDetails } = useCheckout();

	const onSelectMethod = (method: string): void => {
		setPaymentMethod(method as PaymentMethod);
	};

	const { register, formState: { errors }, control, setValue } = useForm<PaymentDetailsData>({
		resolver: zodResolver(paymentDetailsSchema),
		defaultValues: {
			nameOnCard: paymentDetails?.nameOnCard || "",
			cardNumber: paymentDetails?.cardNumber || "",
			expirationDate: paymentDetails?.expirationDate || "",
			cvv: paymentDetails?.cvv || "",
		},
	});

	const nameOnCard = useWatch({ control, name: "nameOnCard" });
	const cardNumber = useWatch({ control, name: "cardNumber" });
	const expirationDate = useWatch({ control, name: "expirationDate" });
	const cvv = useWatch({ control, name: "cvv" });

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

	const formatCardNumber = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const input = e.target;
		const digits = input.value.replace(/\D/g, '');
		const limited = digits.slice(0, 19); // Support up to 19 digits for all card types
		const formatted = limited.replace(/(\d{4})(?=\d)/g, '$1 ');

		input.value = formatted;
		// Update form value after formatting
		setValue("cardNumber", formatted, { shouldValidate: true });
	};

	const formatExpirationDate = (e: React.ChangeEvent<HTMLInputElement>): void => {
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

	const formatCVV = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const input = e.target;
		const digits = input.value.replace(/\D/g, '');
		const limited = digits.slice(0, 4);
		input.value = limited;
		// Update form value after formatting
		setValue("cvv", limited, { shouldValidate: true });
	};

	return (
		<Activity mode={currentStep.title === "Payment" ? "visible" : "hidden"}>
			<RadioGroup>
				<PaymentMethodItem
					method="card"
					title={t("payment.methods.card")}
					isSelected={paymentMethod === "card"}
					onSelect={onSelectMethod}
				>
					<CardFormFields
						register={register}
						errors={errors}
						onCardNumberChange={formatCardNumber}
						onExpirationDateChange={formatExpirationDate}
						onCVVChange={formatCVV}
					/>
				</PaymentMethodItem>
				<PaymentMethodItem
					method="paypal"
					title={t("payment.methods.paypal")}
					description={t("payment.descriptions.paypal")}
					isSelected={paymentMethod === "paypal"}
					onSelect={onSelectMethod}
				/>
				<PaymentMethodItem
					method="applePay"
					title={t("payment.methods.apple_pay")}
					description={t("payment.descriptions.apple_pay")}
					isSelected={paymentMethod === "applePay"}
					onSelect={onSelectMethod}
				/>
				<PaymentMethodItem
					method="googlePay"
					title={t("payment.methods.google_pay")}
					description={t("payment.descriptions.google_pay")}
					isSelected={paymentMethod === "googlePay"}
					onSelect={onSelectMethod}
				/>
			</RadioGroup>
		</Activity>
	);
}