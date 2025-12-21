"use client";

import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/ui/Card";
import LoginForm from "@/components/LoginForm";
import LoginCardFooter from "./LoginCardFooter";
import { useTranslation } from "react-i18next";

export default function LoginScreen() {
	const { t } = useTranslation("auth");

	return (
		<div className="flex min-h-screen items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl">{t("login.title")}</CardTitle>
					<CardDescription>
						{t("login.description")}
					</CardDescription>
				</CardHeader>

				<CardContent>
					<LoginForm />
				</CardContent>

				<CardFooter className="flex justify-center">
					<LoginCardFooter />
				</CardFooter>
			</Card>
		</div>
	);
}