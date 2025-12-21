import { Button } from "@/ui/Button";
import { MinusIcon, PlusIcon } from "lucide-react";
import Text from "@/ui/Text";
import { CartItemControlsProps } from "./types";

export default function CartItemControls({
	onRemove,
	onAdd,
	item,
}: CartItemControlsProps) {
	const { quantity, id } = item;
	return (
		<div className="rounded-md border bg-card text-card-foreground shadow flex items-center gap-2 w-fit">
			<Button variant="ghost" onClick={() => onRemove(id)}>
				<MinusIcon />
			</Button>
			<Text type="p" size="sm" weight="bold">{quantity}</Text>
			<Button variant="ghost" onClick={() => onAdd(item)}>
				<PlusIcon />
			</Button>
		</div>
	);
}

