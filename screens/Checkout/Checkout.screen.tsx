"use client";

import Stepper from "@/components/Checkout/Stepper";
import AddressForm from "@/components/Checkout/AddressForm/AddressForm";
import CheckoutFooter from "@/components/Checkout/CheckoutFooter/CheckoutFooter";
import PaymentDetails from "@/components/Checkout/PaymentDetails/PaymentDetails";
import Text from "@/ui/Text";
import { useTranslation } from "react-i18next";
import Review from "@/components/Checkout/Review";

export default function CheckoutScreen() {
	const { t } = useTranslation("category");

	return (
		<div className="w-full">
			<Text type="h1" size="2xl" weight="bold" className="mb-4 sm:mb-6 sm:text-3xl">{t("checkout.title")}</Text>
			<Stepper />
			<div className="mt-6 sm:mt-8">
				<AddressForm />
				<PaymentDetails />
				<Review />
			</div>
			<CheckoutFooter />
		</div>
	)
}