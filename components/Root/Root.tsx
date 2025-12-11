"use client";

import { Suspense } from "react";
import useTheme from "@/hooks/useTheme";
import { RootProps } from "./types";
import "@/providers/i18n";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import SessionProviderWrapper from "@/providers/session";

export default function Root({ children }: RootProps) {
	const { theme } = useTheme();

	return (
		<SessionProviderWrapper>
			<div className={`${theme} h-full w-full flex justify-center items-center`}>
				<NuqsAdapter>
					<Suspense fallback={<div>Loading...</div>}>
						{children}
					</Suspense>
				</NuqsAdapter>
			</div>
		</SessionProviderWrapper>
	);
}