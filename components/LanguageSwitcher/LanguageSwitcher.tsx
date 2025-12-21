"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/ui/DropdownMenu";
import { useTranslation } from "react-i18next";
import { Button } from "@/ui/Button";

const languageNames: Record<string, string> = {
	en: "EN",
	am: "AM",
	ru: "RU",
};

export default function LanguageSwitcher() {
	const { i18n } = useTranslation();
	const languages = i18n.options.supportedLngs;
	const currentLanguage = i18n.language?.split("-")[0];

	if (!languages || !languages.length) return null;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="sm" className="min-w-12">
					{languageNames[currentLanguage] || currentLanguage.toUpperCase()}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{languages?.map(l => (
					<DropdownMenuItem key={l} onClick={() => i18n.changeLanguage(l)}>
						{languageNames[l] || l.toUpperCase()}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}