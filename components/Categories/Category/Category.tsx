import Link from "next/link";
import { CategoryProps } from "./types";
import LucideIcon from "@/components/LucideIcon";
import Text from "@/ui/Text";
import { useTranslation } from "react-i18next";
import { Button } from "@/ui/Button";
import { Trash2 } from "lucide-react";
import { generateCategoryKey } from "@/utils/generateCategoryKey";

export default function Category({ title, url, icon, isAdmin, onDelete }: CategoryProps) {
	const { t } = useTranslation("categories");
	const translationKey = `db_${generateCategoryKey(title)}`;
	const translatedTitle = t(translationKey, { defaultValue: title });

	const handleDeleteClick = (e: React.MouseEvent): void => {
		e.preventDefault();
		e.stopPropagation();
		if (onDelete) {
			onDelete();
		}
	};

	// Regular category card - navigate to category page, show delete button for admin
	return (
		<div className="flex items-center gap-2 flex-col py-6 flex-1 bg-background-tint1 rounded-2xl relative">
			{isAdmin && onDelete && (
				<Button
					variant="ghost"
					size="icon-sm"
					onClick={handleDeleteClick}
					className="absolute top-2 right-2 text-destructive hover:text-destructive hover:bg-destructive/10 z-10"
				>
					<Trash2 className="size-4" />
				</Button>
			)}
			<Link href={url!} className="flex items-center gap-2 flex-col w-full">
				<div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
					<LucideIcon name={icon} className="stroke-primary" />
				</div>
				<Text size="sm">{translatedTitle}</Text>
			</Link>
		</div>
	);
}
