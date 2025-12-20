import { Card, CardContent } from "@/ui/Card";
import Image from "next/image";
import { ReviewOrderItemProps } from "./types";
import Text from "@/ui/Text";
import { useTranslation } from "react-i18next";

export default function OrderItem({ item }: ReviewOrderItemProps) {
	const { t } = useTranslation("checkout");
	return (
		<Card className="w-full p-6">
			<CardContent className="flex items-center justify-between p-0">
				<div className="flex gap-4">
					<Image src={item.image} alt={item.name} width={100} height={100} className="rounded-md"/>
					<div>
						<Text type="p" size="sm" weight="bold">{item.name}</Text>
						<Text type="p" size="sm" weight="bold">{item.price}</Text>
						<Text type="p" size="sm" weight="bold">{`${t("review.quantity")}: ${item.quantity}`}</Text>
					</div>
				</div>
				<Text type="p" size="sm" weight="bold">{item.price}</Text>
			</CardContent>
		</Card>
	);
}