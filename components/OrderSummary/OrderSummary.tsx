import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/ui/Card";
import { Button } from "@/ui/Button";
import { Separator } from "@/ui/separator";
import { ShieldCheck, Undo2 } from "lucide-react";
import Text from "@/ui/Text";
import { OrderSummaryProps } from "./types";
import { useTranslation } from "react-i18next";

export default function OrderSummary({ totalPrice, onContinueToCheckout }: OrderSummaryProps) {
	const { t } = useTranslation("checkout");

	return (
		<Card className="w-full h-fit">
			<CardHeader>
				<CardTitle>
					<Text type="h2" size="xl" weight="bold" className="sm:text-2xl">{t("order_summary.title")}</Text>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col gap-2">
					<div className="flex items-center justify-between">
						<Text type="p" size="sm" weight="bold">{t("order_summary.subtotal")}</Text>
						<Text type="p" size="sm" weight="bold" color="tint1">{totalPrice}</Text>
					</div>
					<div className="flex items-center justify-between">
						<Text type="p" size="sm" weight="bold">{t("order_summary.shipping")}</Text>
						<Text type="p" size="sm" weight="bold" color="primary">{t("order_summary.free")}</Text>
					</div>
				</div>
				<Separator className="mt-6"/>
			</CardContent>
			{onContinueToCheckout && (
				<CardFooter>
					<div className="flex items-center gap-2 flex-col w-full">
						<Button className="w-full" onClick={onContinueToCheckout}>{t("order_summary.continue_to_checkout")}</Button>
						<div className="flex items-center gap-4">
							<span className="text-sm text-muted-foreground flex items-center gap-1">
								<Undo2 className="size-4" />
								<Text type="p" size="xxs" weight="bold" color="tint1">{t("order_summary.free_returns")}</Text>
							</span>
							<span className="text-sm text-muted-foreground flex items-center gap-1">
								<ShieldCheck className="size-4" />
								<Text type="p" size="xxs" weight="bold" color="tint1">{t("order_summary.secure_payment")}</Text>
							</span>
						</div>
					</div>
				</CardFooter>
			)}
		</Card>
	);
}

