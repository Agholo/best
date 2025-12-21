import { Card, CardContent } from "@/ui/Card";
import Image from "next/image";
import { Button } from "@/ui/Button";
import { Trash2 } from "lucide-react";
import Text from "@/ui/Text";
import { CartItemProps } from "./types";
import CartItemControls from "../CartItemControls";

export default function CartItem({ item, onRemove, onAdd, onDelete }: CartItemProps) {
	return (
		<Card>
			<CardContent className="flex flex-col sm:flex-row gap-4 sm:gap-7 p-4 sm:p-6">
				<div className="relative size-32 sm:size-40 mx-auto sm:mx-0">
					<Image src={item.image} alt={item.name} width={160} height={160} className="z-10 relative" />
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary blur-xl h-32 w-32"/>
				</div>
				<div className="flex flex-col gap-2 flex-1 justify-between">
					<div className="flex flex-col gap-2 w-full">
						<div className="flex items-center justify-between w-full">
							<Text type="h2" size="xl" weight="bold" className="sm:text-2xl">{item.name}</Text>
							<Button variant="ghost" onClick={() => onDelete(item.id)} className="shrink-0">
								<Trash2 />
							</Button>
						</div>
						<Text type="p" size="sm" weight="bold" color="tint1">{item.description}</Text>
					</div>
					<div className="flex items-center gap-2 justify-between flex-col sm:flex-row">
						<CartItemControls
							onRemove={onRemove}
							onAdd={onAdd}
							item={item}
						/>
						<Text type="p" size="sm" weight="bold">{item.price}</Text>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

