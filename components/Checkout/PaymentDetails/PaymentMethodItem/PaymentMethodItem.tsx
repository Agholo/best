import { Card, CardContent, CardDescription, CardTitle } from "@/ui/Card";
import { RadioGroupItem } from "@/ui/radio-group";
import { PaymentMethodItemProps } from "./types";

export default function PaymentMethodItem({
	method,
	title,
	description,
	isSelected,
	onSelect,
	children,
}: PaymentMethodItemProps) {
	return (
		<Card
			onClick={() => onSelect(method)}
			className={`cursor-pointer ${isSelected ? "border-primary" : "border-transparent"} p-4`}
		>
			<div className="flex items-center gap-4">
				<RadioGroupItem
					value={method}
					className={`border-3 ${isSelected ? "border-primary" : "border-transparent"} size-4 inline`}
					checked={isSelected}
				/>
				<CardTitle>{title}</CardTitle>
			</div>
			{description && <CardDescription>{description}</CardDescription>}
			{children && <CardContent>{children}</CardContent>}
		</Card>
	);
}

