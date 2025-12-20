import { Card, CardContent } from "@/ui/Card";
import Image from "next/image";
import { Button } from "@/ui/Button";
import { Trash2 } from "lucide-react";
import Text from "@/ui/Text";
import { CartItemProps } from "./types";
import CartItemControls from "./CartItemControls";

export default function CartItem({ item, onRemove, onAdd, onDelete }: CartItemProps) {
	return (
		<Card>
			<CardContent className="flex gap-7">
				<div className="relative size-40">
					<Image src={item.image} alt={item.name} width={160} height={160} className="z-10 relative" />
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary blur-xl h-32 w-32"/>
				</div>
				<div className="flex flex-col gap-2 flex-1 justify-between">
					<div className="flex flex-col gap-2 w-full">
						<div className="flex items-center justify-between w-full">
							<Text type="h2" size="2xl" weight="bold">{item.name}</Text>
							<Button variant="ghost" onClick={() => onDelete(item.id)}>
								<Trash2 />
							</Button>
						</div>
						<Text type="p" size="sm" weight="bold" color="tint1">{item.description}</Text>
					</div>
					<CartItemControls
						onRemove={onRemove}
						onAdd={onAdd}
						item={item}
					/>
				</div>
			</CardContent>
		</Card>
	);
}

