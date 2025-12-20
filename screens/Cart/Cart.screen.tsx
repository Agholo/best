"use client";

import Text from "@/ui/Text";
import useCart from "@/hooks/useCart";
import useRedirect from "@/hooks/useRedirect";
import CartItem from "@/components/CartItem";
import OrderSummary from "@/components/OrderSummary";
import { useTranslation } from "react-i18next";

export default function CartScreen() {
	const { items, removeItem, addItem, deleteItem, getTotalPrice } = useCart();
	const { navigate } = useRedirect();
	const { t } = useTranslation("checkout");

	const handleContinueToCheckout = (): void => {
		navigate("/checkout");
	};

	return (
		<div className="w-full">
			<Text type="h1" size="5xl" weight="bold">{t("cart.title")}</Text>
			<div className="flex gap-4 relative">
				<div className="flex flex-col gap-4 w-3/4">
					{items.map((item) => (
						<CartItem
							key={item.id}
							item={item}
							onRemove={removeItem}
							onAdd={addItem}
							onDelete={deleteItem}
						/>
					))}
				</div>
				<OrderSummary
					totalPrice={getTotalPrice()}
					onContinueToCheckout={handleContinueToCheckout}
				/>
			</div>
		</div>
	);
}