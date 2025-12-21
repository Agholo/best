"use client";

import Input from "@/ui/Input";
import { SearchIcon } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import { useTranslation } from "react-i18next";

export default function SearchBar() {
	const { t } = useTranslation("common");
	const [search, setSearch] = useQueryState("s", parseAsString.withDefault(""));

	return (
		<div className="relative w-[70%] sm:w-[50%] max-w-xs">
			<SearchIcon className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
			<Input name="search" placeholder={t("search_placeholder")} className="rounded-full h-9 w-full pl-9 text-sm" type="text" autoComplete="off" value={search} onChange={(e) => setSearch(e.target.value)}/>
		</div>
	)
}