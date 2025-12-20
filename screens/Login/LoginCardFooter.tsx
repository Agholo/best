"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function LoginCardFooter() {
	const router = useRouter();
	const { t } = useTranslation("auth");

	return (
		<p className="text-center text-sm text-muted-foreground">
			{t("login.no_account")}{" "}
			<button
				type="button"
				onClick={() => router.push("/auth/signup")}
				className="text-primary hover:underline"
			>
				{t("login.sign_up")}
			</button>
		</p>
	)
}