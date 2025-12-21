"use client";

import { useCheckoutSteps } from "@/hooks/useCheckoutSteps";
import { useTranslation } from "react-i18next";
import useCheckoutValidation from "@/hooks/useCheckoutValidation";

export default function Stepper() {
	const { steps, currentStep, goToStep } = useCheckoutSteps();
	const { t } = useTranslation("category");
	const { isStepValid } = useCheckoutValidation();

	const getStepTranslation = (stepTitle: string): string => {
		const stepKey = stepTitle.toLowerCase() as "address" | "payment" | "review";
		return t(`steps.${stepKey}`);
	};

	const canNavigateToStep = (stepIndex: number): boolean => {
		// First step (Address) is always accessible
		if (stepIndex === 0) {
			return true;
		}

		// Check if all previous steps are valid
		for (let i = 0; i < stepIndex; i++) {
			const previousStep = steps[i];
			if (!isStepValid(previousStep.title)) {
				return false;
			}
		}

		return true;
	};

	const handleStepClick = (stepIndex: number): void => {
		if (canNavigateToStep(stepIndex)) {
			goToStep(stepIndex);
		}
	};

	return (
		<div className="flex justify-center gap-4 mb-5">
			{steps.map((step, index) => {
				const isCurrentStep = step.id === currentStep.id;
				const isClickable = canNavigateToStep(index);
				const stepIndex = index;

				return (
					<button
						key={step.id}
						onClick={() => handleStepClick(stepIndex)}
						disabled={!isClickable}
						className={`flex items-center justify-center ${
							isCurrentStep ? "border-primary!" : "border-transparent"
						} rounded-none border-b-2 p-2 transition-all duration-300 ${
							isClickable
								? "hover:border-gray-500 cursor-pointer"
								: "cursor-not-allowed opacity-50"
						}`}
					>
						<span
							className={`${
								isCurrentStep ? "text-text-primary" : isClickable ? "text-gray-500" : "text-gray-400"
							}`}
						>
							{getStepTranslation(step.title)}
						</span>
					</button>
				);
			})}
		</div>
	);
}
