import { Card, CardContent } from "@/ui/Card";
import Image from "next/image";
import { ReviewOrderItemProps } from "./types";
import Text from "@/ui/Text";
import { useTranslation } from "react-i18next";

export default function OrderItem({ item }: ReviewOrderItemProps) {
	const { t } = useTranslation("checkout");
	return (
		<Card className="w-full p-4 sm:p-6">
			<CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-0 gap-4">
				<div className="flex gap-4 w-full sm:w-auto">
					<Image src={item.image} alt={item.name} width={100} height={100} className="rounded-md shrink-0"/>
					<div className="flex-1">
						<Text type="p" size="sm" weight="bold">{item.name}</Text>
						<Text type="p" size="sm" weight="bold">{item.price}</Text>
						<Text type="p" size="sm" weight="bold">{`${t("review.quantity")}: ${item.quantity}`}</Text>
					</div>
				</div>
				<Text type="p" size="sm" weight="bold" className="shrink-0">{item.price}</Text>
			</CardContent>
		</Card>
	);
}
