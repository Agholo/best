import { IconName } from "@/components/LucideIcon/LucideIcon";

export interface Category {
	id: number;
	title: string;
	url: string;
	icon: IconName;
}

export interface CategoryProps extends Category {
	isAdmin?: boolean;
	onDelete?: () => void;
}
