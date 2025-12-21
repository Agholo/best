import { Card, CardContent, CardDescription, CardTitle } from "@/ui/Card";
import { RadioGroupItem } from "@/ui/radio-group";
import { PaymentMethodItemProps } from "./types";
import { useTranslation } from "react-i18next";

export default function PaymentMethodItem({
	method,
	title,
	description,
	isSelected,
	onSelect,
	children,
	isAvailable = true,
	unavailableMessage,
}: PaymentMethodItemProps) {
	const { t } = useTranslation("checkout");
	const handleClick = (): void => {
		if (isAvailable) {
			onSelect(method);
		}
	};

	return (
		<Card
			onClick={handleClick}
			className={`${
				isAvailable ? "cursor-pointer" : "cursor-not-allowed opacity-60"
			} ${isSelected ? "border-primary" : "border-transparent"} p-4 relative`}
		>
			{!isAvailable && (
				<div className="absolute top-2 right-2">
					<span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
						{t(unavailableMessage || "Unavailable")}
					</span>
				</div>
			)}
			<div className="flex items-center gap-4">
				<RadioGroupItem
					value={method}
					className={`border-3 ${isSelected ? "border-primary" : "border-transparent"} size-4 inline ${
						!isAvailable ? "opacity-50" : ""
					}`}
					checked={isSelected}
					disabled={!isAvailable}
				/>
				<CardTitle className={!isAvailable ? "text-gray-500" : ""}>{t(title)}</CardTitle>
			</div>
			{description && (
				<CardDescription className={!isAvailable ? "text-gray-400" : ""}>
					{t(description)}
				</CardDescription>
			)}
			{children && <CardContent>{children}</CardContent>}
		</Card>
	);
}

