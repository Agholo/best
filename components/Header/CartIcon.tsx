"use client";

import useCart from "@/hooks/useCart";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import Text from "@/ui/Text";

export default function CartIcon() {
	const { getTotalItems } = useCart();
	return (
		<Link href="/cart" className="relative">
			<span className="size-3 bg-primary rounded-full flex items-center justify-center absolute -top-1.5 -right-1.5">
				<Text size="xxs" weight="bold">{getTotalItems()}</Text>
			</span>
			<ShoppingCart className="size-4" />
		</Link>
	);
}