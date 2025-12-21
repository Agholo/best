import { PaymentMethod } from "@/hooks/useCheckout";

export const getMethodDescription = (method: PaymentMethod): string | undefined => {
	if (method === "paypal") {
		return "payment.descriptions.paypal";
	}
	if (method === "applePay") {
		return "payment.descriptions.apple_pay";
	}
	if (method === "googlePay") {
		return "payment.descriptions.google_pay";
	}
	return undefined;
};

export const getMethodTitle = (method: PaymentMethod): string => {
	if (method === "card") {
		return "payment.methods.card";
	}
	if (method === "paypal") {
		return "payment.methods.paypal";
	}
	if (method === "applePay") {
		return "payment.methods.apple_pay";
	}
	if (method === "googlePay") {
		return "payment.methods.google_pay";
	}
	return "";
};

