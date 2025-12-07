"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/ui/DropdownMenu";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
	const { i18n } = useTranslation();
	const languages = i18n.options.supportedLngs;

	if (!languages || !languages.length) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
				{i18n.language}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
				{languages?.map(l => (
					<DropdownMenuItem key={l} onClick={() => i18n.changeLanguage(l)}>
						{l}
					</DropdownMenuItem>
				))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}