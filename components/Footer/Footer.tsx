"use client";

import { Separator } from "@/ui/separator";
import { facebookUrl, footerInfoGroups, instagramUrl } from "./data";
import InfoGroup from "./InfoGroup";
import Text from "@/ui/Text";
import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Footer() {
	const { t } = useTranslation();
	const year = new Date().getFullYear();
	return (
		<footer className="w-full bg-background-tint1 mt-4">
			<div className="w-full max-w-[80%] mx-auto flex justify-between items-center py-6 sm:py-8 flex-col px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
					{footerInfoGroups.map((infoGroup) => (
						<InfoGroup key={infoGroup.titleKey} {...infoGroup} />
					))}
				</div>
				<Separator className="my-6 sm:my-8 w-full"/>
				<div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 w-full">
					<Text color="tint1" size="sm">© {year} WebAPP. {t("rights_reserved")}</Text>
					<div className="flex items-center gap-2">
						<Link href={facebookUrl}>
							<Facebook className="fill-(--color-accent)"/>
						</Link>
						<Link href={instagramUrl}>
							<Instagram />
						</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}