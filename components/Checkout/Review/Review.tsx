import Text from "@/ui/Text";
import { useTranslation } from "react-i18next";
import { CreditCard, Mail, MapPin, PackageOpenIcon, Phone, ShieldCheck, Truck, TruckElectric, User, Map } from "lucide-react";
import OrderItem from "./OrderItem";
import useCart from "@/hooks/useCart";
import { Activity } from "react";
import { useCheckoutSteps } from "@/hooks/useCheckoutSteps";
import { CheckoutStepTitle } from "@/types/steps";
import OrderSummary from "@/components/OrderSummary";
import useCheckout from "@/hooks/useCheckout";

export default function Review() {
	const { currentStep } = useCheckoutSteps();
	const { t } = useTranslation("checkout");
	const { items, getTotalPrice } = useCart();
	const { paymentMethod, paymentDetails, address } = useCheckout();
	const isPaymentMethodCard = paymentMethod === "card";

	return (
		<Activity mode={currentStep.title === CheckoutStepTitle.REVIEW ? "visible" : "hidden"}>
			<div className="w-full relative flex gap-4 space-between">
				<div className="w-full">
					<Text type="h2" size="2xl" weight="bold">{t("review.title")}</Text>
					<Text type="p" size="sm" weight="bold">{t("review.description")}</Text>
					<div>
						<span className="flex items-center gap-2 my-4">
							<PackageOpenIcon className="stroke-primary" />
							<Text type="p" size="sm" weight="bold">{t("review.items_in_your_order")}</Text>
						</span>
						<div className="flex flex-col gap-4">
							{items.map((item) => (
								<OrderItem key={item.id} item={item} />
							))}
						</div>
					</div>
					<div className="mt-4 w-full">
						<span className="flex items-center gap-2 my-4">
							<TruckElectric className="stroke-primary" />
							<Text type="p" size="sm" weight="bold">{t("review.shipping_information")}</Text>
						</span>
						<div className="flex items-center justify-between border bg-card rounded-xl shadow-sm w-full p-4">
							<div className="flex items-center gap-2">
								<span className="flex items-center p-3 bg-primary/10 rounded-md">
									<Truck className="fill-primary stroke-primary"/>
								</span>
								<div className="flex flex-col gap-2">
									<Text type="p" size="sm" weight="bold">{t("review.shipping_method")}</Text>
									<Text type="p" size="sm" weight="bold">{t("review.shipping_duration_info")}</Text>
								</div>
							</div>
							<span className="flex items-center p-2 bg-primary/10 rounded-md">
								<p className="text-primary">FREE</p>
							</span>
						</div>
					</div>
					<div className="mt-4 w-full">
						<span className="flex items-center gap-2 my-4">
							<CreditCard className="stroke-primary" />
							<Text type="p" size="sm" weight="bold">{t("review.payment_information")}</Text>
						</span>
						<div className="flex items-center justify-between border bg-card rounded-xl shadow-sm w-full p-4">
							<div className="flex items-center gap-2">
								<span className="flex items-center p-3 bg-primary/10 rounded-md">
									<CreditCard className="stroke-primary"/>
								</span>
								<div className="flex flex-col gap-2">
									<Text type="p" size="sm" weight="bold">{t(`review.payment_method.${paymentMethod}`)}</Text>
									{isPaymentMethodCard && <Text type="p" size="sm" weight="bold">{`**** **** **** ${paymentDetails?.cardNumber?.slice(-4)}`}</Text>}
								</div>
							</div>
							<ShieldCheck className="stroke-primary"/>
						</div>
					</div>
					<div className="mt-4 w-full">
						<span className="flex items-center gap-2 my-4">
							<MapPin className="stroke-primary" />
							<Text type="p" size="sm" weight="bold">{t("review.delivery_address")}</Text>
						</span>
						<div className="flex items-center justify-between border bg-card rounded-xl shadow-sm w-full p-4">
							<div className="flex flex-col gap-2">
								<span className="flex gap-2">
									<User className="fill-primary stroke-primary"/>
									<span className="flex gap-2 flex-col">
										<Text type="p" size="sm" weight="bold">{t("address.full_name")}</Text>
										<Text type="p" size="sm" weight="bold">{address?.fullName}</Text>
									</span>
								</span>
								<span className="flex gap-2">
									<Mail className="stroke-primary"/>
									<span className="flex gap-2 flex-col">
										<Text type="p" size="sm" weight="bold">{t("address.email")}</Text>
										<Text type="p" size="sm" weight="bold">{address?.email}</Text>
									</span>
								</span>
								<span className="flex gap-2">
									<Phone className="fill-primary stroke-primary"/>
									<span className="flex gap-2 flex-col">
										<Text type="p" size="sm" weight="bold">{t("address.phone")}</Text>
										<Text type="p" size="sm" weight="bold">{address?.phone}</Text>
									</span>
								</span>
								<span className="flex gap-2">
									<Map className="stroke-primary"/>
									<span className="flex gap-2 flex-col">
										<Text type="p" size="sm" weight="bold">{t("address.address")}</Text>
										<Text type="p" size="sm" weight="bold">{address?.address}</Text>
										<Text type="p" size="sm" weight="bold">{address?.city}</Text>
									</span>
								</span>
							</div>
						</div>
					</div>
				</div>
				<OrderSummary
					totalPrice={getTotalPrice()}
					onContinueToCheckout={() => {}}
				/>
			</div>
		</Activity>
	);
}