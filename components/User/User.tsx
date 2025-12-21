"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Avatar, AvatarFallback } from "@/ui/Avatar";
import { Button } from "@/ui/Button";
import { PopoverTrigger, PopoverContent, Popover } from "@/ui/Popover";
import { useTranslation } from "react-i18next";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import LanguageSwitcher from "../LanguageSwitcher";
import { Separator } from "@/ui/separator";

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
			<Popover>
				<PopoverTrigger asChild>
					<Button variant="outline" size="sm">
						{t("user.sign_in")}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-56" align="end">
					<div className="flex flex-col gap-3">
						<Button onClick={() => signIn()} className="w-full">
							{t("user.sign_in")}
						</Button>
						<Separator />
						<div className="flex items-center justify-between">
							<span className="text-sm font-medium">{t("user.theme")}</span>
							<ThemeSwitcher />
						</div>
						<Separator />
						<div className="flex items-center justify-between">
							<span className="text-sm font-medium">{t("user.language")}</span>
							<LanguageSwitcher />
						</div>
					</div>
				</PopoverContent>
			</Popover>
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
				<Avatar className="cursor-pointer">
					<AvatarFallback>{userInitials}</AvatarFallback>
				</Avatar>
			</PopoverTrigger>
			<PopoverContent className="w-56" align="end">
				<div className="flex flex-col gap-3">
					<div className="flex items-center justify-between">
						<span className="text-sm font-medium">{t("user.theme")}</span>
						<ThemeSwitcher />
					</div>
					<Separator />
					<div className="flex items-center justify-between">
						<span className="text-sm font-medium">{t("user.language")}</span>
						<LanguageSwitcher />
					</div>
					<Separator />
					<Button onClick={() => signOut()} variant="outline" className="w-full">
						{t("user.sign_out")}
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
}
