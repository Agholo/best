"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function SignupCardFooter() {
	const router = useRouter();
	const { t } = useTranslation("auth");

	return (
		<p className="text-center text-sm text-muted-foreground">
			{t("signup.has_account")}{" "}
			<button
				type="button"
				onClick={() => router.push("/auth/login")}
				className="text-primary hover:underline"
			>
				{t("signup.sign_in")}
			</button>
		</p>
	);
}

