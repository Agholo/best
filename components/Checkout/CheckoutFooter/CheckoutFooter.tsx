'use client';

import { Button } from "@/ui/Button";
import { Separator } from "@/ui/separator";
import { useCheckoutSteps } from "@/hooks/useCheckoutSteps";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function CheckoutFooter() {
	const router = useRouter();
	const { previousStep, goToPreviousStep, goToNextStep, nextStep, isFirstStep, isLastStep } = useCheckoutSteps();
	const { t } = useTranslation("checkout");
	const previousStepTitle = isFirstStep ? t("footer.cart") : previousStep?.title;
	const nextStepTitle = isLastStep ? t("footer.complete") : nextStep?.title;

	const handlePrevious = () => {
		const moved = goToPreviousStep();
		if (!moved && isFirstStep) {
			router.push("/cart");
		}
	};

	const handleNext = () => {
		const moved = goToNextStep();
		if (!moved && isLastStep) {
			router.push("/checkout/success");
		}
	};

	return (
		<div className="flex flex-col gap-9 w-full mt-9">
			<Separator />
			<div className="flex w-full justify-between items-center">
				<Button onClick={handlePrevious} variant="outline">
					<ArrowLeft className="size-4" />
					{t("footer.back_to")} {previousStepTitle}
				</Button>
				<Button onClick={handleNext}>
					{t("footer.continue_to")} {nextStepTitle}
					<ArrowRight className="size-4" />
				</Button>
			</div>
		</div>
	);
}
