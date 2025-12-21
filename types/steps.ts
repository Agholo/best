export enum CheckoutStepTitle {
	ADDRESS = "Address",
	PAYMENT = "Payment",
	REVIEW = "Review",
}

export interface CheckoutStep {
	id: number;
	title: CheckoutStepTitle;
}

export interface CheckoutSteps {
	steps: CheckoutStep[];
	currentStepIndex: number;
	currentStep: CheckoutStep;
	nextStep: () => void;
	previousStep: () => void;
	goToStep: (stepIndex: number) => void;
}
