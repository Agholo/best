import Link from "next/link";
import { Category as CategoryProps } from "./types";
import LucideIcon from "@/components/LucideIcon";
import Text from "@/ui/Text";

export default function Category({ title, url, icon }: CategoryProps) {
	return (
		<Link href={url} className="flex items-center gap-2 flex-col py-6 px-4 w-full bg-background-tint1 rounded-2xl">
			<div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
				<LucideIcon name={icon} className="stroke-primary" />
			</div>
			<Text size="sm">{title}</Text>
		</Link>
	)
}

