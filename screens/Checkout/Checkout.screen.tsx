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
		<div>
			<Text type="h1" size="3xl" weight="bold">{t("checkout.title")}</Text>
			<Stepper />
			<AddressForm />
			<PaymentDetails />
			<Review />
			<CheckoutFooter />
		</div>
	)
}