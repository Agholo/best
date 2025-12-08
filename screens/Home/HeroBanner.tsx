"use client";

import { useTranslation } from "react-i18next";
import Text from "@/ui/Text";
import Image from "next/image";
import { Button } from "@/ui/Button";

export default function HeroBanner() {
	const { t } = useTranslation("hero");
	return (
		<div className="flex items-stretch justify-between">
			<div className="flex flex-col gap-8 h-full max-w-[380px] mt-15">
				<Text type="h1" size="6xl" weight="bold" lineHeight="none" letterSpacing="wide">
					{t("hero_banner_title")}
				</Text>
				<Text type="p" size="md" color="tint1">
					{t("hero_banner_description")}
				</Text>
				<Button className="w-fit px-8 py-4">
					{t("hero_banner_button")}
				</Button>
			</div>
			<div className="relative flex items-center justify-center">
				<Image src="/images/hero.png" alt="Hero Banner" width={437} height={500} className="relative z-10" />
				<div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl" />
			</div>
		</div>
	)
}