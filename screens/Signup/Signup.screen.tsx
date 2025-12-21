"use client";

import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/ui/Card";
import SignupForm from "@/components/SignupForm";
import SignupCardFooter from "./SignupCardFooter";
import { useTranslation } from "react-i18next";

export default function SignupScreen() {
	const { t } = useTranslation("auth");

	return (
		<div className="flex min-h-screen items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl">{t("signup.title")}</CardTitle>
					<CardDescription>
						{t("signup.description")}
					</CardDescription>
				</CardHeader>

				<CardContent>
					<SignupForm />
				</CardContent>

				<CardFooter className="flex justify-center">
					<SignupCardFooter />
				</CardFooter>
			</Card>
		</div>
	);
}

