"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AddressFormData } from "@/components/Checkout/AddressForm/types";
import { PaymentDetailsData } from "@/components/Checkout/PaymentDetails/types";

export type PaymentMethod = "card" | "paypal" | "applePay" | "googlePay";

interface CheckoutState {
	address: AddressFormData | null;
	paymentMethod: PaymentMethod | null;
	paymentDetails: PaymentDetailsData | null;
	setAddress: (address: AddressFormData) => void;
	setPaymentMethod: (method: PaymentMethod) => void;
	setPaymentDetails: (details: PaymentDetailsData) => void;
	clearCheckout: () => void;
	hasAddress: () => boolean;
	hasPaymentMethod: () => boolean;
	hasPaymentDetails: () => boolean;
	isCheckoutComplete: () => boolean;
}

const useCheckout = create<CheckoutState>()(
	persist(
		(set, get) => ({
			address: null,
			paymentMethod: null,
			paymentDetails: null,
			setAddress: (address: AddressFormData) => {
				set({ address });
			},
			setPaymentMethod: (method: PaymentMethod) => {
				set({ paymentMethod: method });
				// Clear payment details if switching away from card
				if (method !== "card") {
					set({ paymentDetails: null });
				}
			},
			setPaymentDetails: (details: PaymentDetailsData) => {
				set({ paymentDetails: details });
			},
			clearCheckout: () => {
				set({
					address: null,
					paymentMethod: null,
					paymentDetails: null,
				});
			},
			hasAddress: () => {
				return get().address !== null;
			},
			hasPaymentMethod: () => {
				return get().paymentMethod !== null;
			},
			hasPaymentDetails: () => {
				return get().paymentDetails !== null;
			},
			isCheckoutComplete: () => {
				const state = get();
				const hasAddress = state.address !== null;
				const hasPaymentMethod = state.paymentMethod !== null;
				const hasPaymentDetails = state.paymentMethod === "card"
					? state.paymentDetails !== null
					: true; // Other payment methods don't need details
				return hasAddress && hasPaymentMethod && hasPaymentDetails;
			},
		}),
		{
			name: "checkout-storage",
			storage: {
				getItem: (name) => {
					const str = sessionStorage.getItem(name);
					return str ? JSON.parse(str) : null;
				},
				setItem: (name, value) => {
					sessionStorage.setItem(name, JSON.stringify(value));
				},
				removeItem: (name) => {
					sessionStorage.removeItem(name);
				},
			},
		}
	)
);

export default useCheckout;

