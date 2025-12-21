import { create } from "zustand";

interface CheckoutValidationState {
	isAddressFormValid: boolean;
	isPaymentFormValid: boolean;
	setAddressFormValid: (isValid: boolean) => void;
	setPaymentFormValid: (isValid: boolean) => void;
	isStepValid: (stepTitle: string) => boolean;
}

const useCheckoutValidation = create<CheckoutValidationState>((set, get) => ({
	isAddressFormValid: false,
	isPaymentFormValid: false,
	setAddressFormValid: (isValid: boolean) => {
		set({ isAddressFormValid: isValid });
	},
	setPaymentFormValid: (isValid: boolean) => {
		set({ isPaymentFormValid: isValid });
	},
	isStepValid: (stepTitle: string) => {
		const state = get();
		if (stepTitle === "Address") {
			return state.isAddressFormValid;
		}
		if (stepTitle === "Payment") {
			return state.isPaymentFormValid;
		}
		// Review step doesn't need validation
		return true;
	},
}));

export default useCheckoutValidation;

