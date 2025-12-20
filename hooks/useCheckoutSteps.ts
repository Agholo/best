import { create } from "zustand";
import { CheckoutStep } from "@/types/steps";
import { steps } from "@/mock/steps";

interface CheckoutStepsState {
	steps: CheckoutStep[];
	currentStepIndex: number;
	currentStep: CheckoutStep;
	previousStep?: CheckoutStep;
	nextStep?: CheckoutStep;
	isLastStep: boolean;
	isFirstStep: boolean;
	goToNextStep: () => boolean;
	goToPreviousStep: () => boolean;
	goToStep: (stepIndex: number) => void;
}

export const useCheckoutSteps = create<CheckoutStepsState>()((set, get) => ({
	steps,
	currentStepIndex: 0,
	currentStep: steps[0],
	previousStep: undefined,
	nextStep: steps[1],
	isFirstStep: true,
	isLastStep: steps.length === 1,
	goToNextStep: () => {
		const { currentStepIndex, steps } = get();
		// Check if already at last step
		if (currentStepIndex >= steps.length - 1) {
			return false; // Indicates we're at the last step, navigation should be handled by component
		}
		set((state) => {
			const nextIndex = state.currentStepIndex + 1;
			return {
				currentStepIndex: nextIndex,
				currentStep: state.steps[nextIndex],
				previousStep: steps[nextIndex - 1],
				nextStep: steps[nextIndex + 1],
				isFirstStep: nextIndex === 0,
				isLastStep: nextIndex === steps.length - 1,
			};
		});
		return true; // Successfully moved to next step
	},
	goToPreviousStep: () => {
		const state = get();
		// Check if already at first step
		if (state.currentStepIndex <= 0) {
			return false; // Indicates we're at the first step, navigation should be handled by component
		}
		set((state) => {
			const prevIndex = state.currentStepIndex - 1;
			return {
				currentStepIndex: prevIndex,
				currentStep: state.steps[prevIndex],
				previousStep: steps[prevIndex - 1],
				nextStep: steps[prevIndex + 1],
				isFirstStep: prevIndex === 0,
				isLastStep: prevIndex === steps.length - 1,
			};
		});
		return true; // Successfully moved to previous step
	},
	goToStep: (stepIndex: number) => {
		set((state) => {
			const validIndex = Math.max(
				0,
				Math.min(stepIndex, state.steps.length - 1)
			);
			return {
				currentStepIndex: validIndex,
				currentStep: state.steps[validIndex],
				previousStep: steps[validIndex - 1],
				nextStep: steps[validIndex + 1],
				isFirstStep: validIndex === 0,
				isLastStep: validIndex === steps.length - 1,
			};
		});
	},
}));
