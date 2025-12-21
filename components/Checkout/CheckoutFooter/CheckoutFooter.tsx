'use client';

import { Button } from "@/ui/Button";
import { Separator } from "@/ui/separator";
import { useCheckoutSteps } from "@/hooks/useCheckoutSteps";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import useCheckoutValidation from "@/hooks/useCheckoutValidation";

export default function CheckoutFooter() {
	const router = useRouter();
	const { previousStep, goToPreviousStep, goToNextStep, nextStep, isFirstStep, isLastStep, currentStep } = useCheckoutSteps();
	const { t } = useTranslation("checkout");
	const { isStepValid } = useCheckoutValidation();
	const getStepTranslation = (stepTitle: string | undefined): string => {
		if (!stepTitle) return "";
		const stepKey = stepTitle.toLowerCase() as "address" | "payment" | "review";
		return t(`steps.${stepKey}`, { ns: "category" });
	};

	const previousStepTitle = isFirstStep ? t("footer.cart") : getStepTranslation(previousStep?.title);
	const nextStepTitle = isLastStep ? t("footer.complete") : getStepTranslation(nextStep?.title);
	const isCurrentStepValid = isStepValid(currentStep.title);

	const handlePrevious = (): void => {
		const moved = goToPreviousStep();
		if (!moved && isFirstStep) {
			router.push("/cart");
		}
	};

	const handleNext = (): void => {
		if (!isCurrentStepValid) {
			return;
		}
		const moved = goToNextStep();
		if (!moved && isLastStep) {
			router.push("/checkout/success");
		}
	};

	return (
		<div className="flex flex-col gap-6 sm:gap-9 w-full mt-6 sm:mt-9">
			<Separator />
			<div className="flex flex-col sm:flex-row w-full justify-between items-stretch sm:items-center gap-3 sm:gap-4">
				<Button onClick={handlePrevious} variant="outline" className="w-full sm:w-auto">
					<ArrowLeft className="size-4" />
					{t("footer.back_to")} {previousStepTitle}
				</Button>
				<Button onClick={handleNext} disabled={!isCurrentStepValid} className="w-full sm:w-auto">
					{t("footer.continue_to")} {nextStepTitle}
					<ArrowRight className="size-4" />
				</Button>
			</div>
		</div>
	);
}
