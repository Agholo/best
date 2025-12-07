"use client";

import Input from "@/ui/Input";
import { SearchIcon } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import { useTranslation } from "react-i18next";

export default function SearchBar() {
	const { t } = useTranslation("common");
	const [search, setSearch] = useQueryState("s", parseAsString.withDefault(""));

	return (
		<div className="relative w-(--search-bar-width)">
			<SearchIcon className="size-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
			<Input name="search" placeholder={t("search_placeholder")} className="rounded-(--search-bar-height) w-full pl-10" type="text" autoComplete="off" value={search} onChange={(e) => setSearch(e.target.value)}/>
		</div>
	)
}