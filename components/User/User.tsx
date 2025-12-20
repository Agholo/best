"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Avatar, AvatarFallback } from "@/ui/Avatar";
import { Button } from "@/ui/Button";
import { PopoverTrigger, PopoverContent, Popover } from "@/ui/Popover";
import { useTranslation } from "react-i18next";

export default function User() {
	const { data: session, status } = useSession();
	const { t } = useTranslation("auth");

	if (status === "loading") {
		return (
			<div>
				<Avatar>
					<AvatarFallback>...</AvatarFallback>
				</Avatar>
			</div>
		);
	}

	if (!session) {
		return (
			<Button onClick={() => signIn()} variant="outline" size="sm">
				{t("user.sign_in")}
			</Button>
		);
	}

	const userInitials = session.user?.name
		?.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2) || session.user?.email?.[0].toUpperCase() || "U";

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Avatar>
					<AvatarFallback>{userInitials}</AvatarFallback>
				</Avatar>
			</PopoverTrigger>
			<PopoverContent className="w-80">
				<Button onClick={() => signOut()}>{t("user.sign_out")}</Button>
			</PopoverContent>
		</Popover>
	);
}
