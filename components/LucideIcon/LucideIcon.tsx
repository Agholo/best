import * as Icons from "lucide-react";
import type { LucideProps } from "lucide-react";
import { ComponentType } from "react";

export type IconName = keyof typeof Icons;

export default function LucideIcon({ name, ...props }: { name: IconName } & LucideProps) {
	const Icon = Icons[name] as ComponentType<LucideProps>;
	return <Icon {...props} />;
}
