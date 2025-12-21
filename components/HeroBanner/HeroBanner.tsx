"use client";

import { useTranslation } from "react-i18next";
import Text from "@/ui/Text";
import Image from "next/image";
import { Button } from "@/ui/Button";

export default function HeroBanner() {
	const { t } = useTranslation("hero");
	return (
		<div className="flex flex-col md:flex-row items-center md:items-stretch justify-between gap-6 md:gap-8 py-6 md:py-8">
			<div className="flex flex-col gap-4 sm:gap-6 md:gap-8 h-full max-w-full md:max-w-[380px] mt-0 md:mt-15">
				<Text type="h1" size="3xl" weight="bold" lineHeight="none" letterSpacing="wide" className="sm:text-4xl md:text-5xl lg:text-6xl">
					{t("hero_banner_title")}
				</Text>
				<Text type="p" size="sm" color="tint1" className="sm:text-md">
					{t("hero_banner_description")}
				</Text>
				<Button className="w-full sm:w-fit px-6 sm:px-8 py-3 sm:py-4">
					{t("hero_banner_button")}
				</Button>
			</div>
			<div className="relative flex items-center justify-center w-full md:w-auto">
				<Image src="/images/hero.png" alt="Hero Banner" width={437} height={500} className="relative z-10 w-full h-auto max-w-[300px] sm:max-w-[350px] md:max-w-[437px]" />
				<div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl" />
			</div>
		</div>
	)
}

