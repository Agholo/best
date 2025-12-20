"use client";

import { useCheckoutSteps } from "@/hooks/useCheckoutSteps";
import { useTranslation } from "react-i18next";

export default function Stepper() {
	const { steps, currentStep } = useCheckoutSteps();
	const { t } = useTranslation("category");

	const getStepTranslation = (stepTitle: string): string => {
		const stepKey = stepTitle.toLowerCase() as "address" | "payment" | "review";
		return t(`steps.${stepKey}`);
	};

	return (
		<div className="flex justify-center gap-4 mb-5">
			{steps.map((step) => {
				const isCurrentStep = step.id === currentStep.id;
				return (
					<button key={step.id} className={`flex items-center justify-center ${isCurrentStep ? "border-primary!" : "border-transparent"} rounded-none border-b-2 p-2 hover:border-gray-500 transition-all duration-300 cursor-pointer`}>
						<span className={`${isCurrentStep ? "text-text-primary" : "text-gray-500"}`}>{getStepTranslation(step.title)}</span>
					</button>
				);
			})}
		</div>
	);
}
