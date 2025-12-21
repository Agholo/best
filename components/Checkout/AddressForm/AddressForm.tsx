"use client";

import { useCheckoutSteps } from "@/hooks/useCheckoutSteps";
import { FieldSet, FieldGroup } from "@/ui/field";
import { Activity, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressFormSchema, type AddressFormData } from "./types";
import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";
import useCheckout from "@/hooks/useCheckout";
import useCheckoutValidation from "@/hooks/useCheckoutValidation";
import FormField from "./FormField";

export default function AddressForm() {
	const { currentStep } = useCheckoutSteps();
	const { data } = useSession();
	const { t } = useTranslation("checkout");
	const { setAddress, address } = useCheckout();
	const { setAddressFormValid } = useCheckoutValidation();
	const {
		register,
		formState: { errors, isValid },
		getValues,
		trigger,
	} = useForm<AddressFormData>({
		resolver: zodResolver(addressFormSchema),
		mode: "onChange",
		defaultValues: {
			fullName: address?.fullName || data?.user?.name || "",
			email: address?.email || data?.user?.email || "",
			phone: address?.phone || "",
			city: address?.city || "",
			address: address?.address || "",
		},
	});

	// Update validation state when form validity changes
	useEffect(() => {
		setAddressFormValid(isValid);
	}, [isValid, setAddressFormValid]);

	const handleFieldChange = async (): Promise<void> => {
		const formData = getValues();
		setAddress({
			fullName: formData.fullName || "",
			email: formData.email || "",
			phone: formData.phone || "",
			city: formData.city || "",
			address: formData.address || "",
		});
		// Trigger validation after saving
		await trigger();
	};

	return (
		<Activity mode={currentStep.title === 'Address' ? "visible" : "hidden"}>
			<FieldSet>
				<FormField
					label={t("address.full_name")}
					placeholder={t("address.full_name_placeholder")}
					error={errors.fullName?.message}
					register={register("fullName", {
						onChange: handleFieldChange,
						onBlur: handleFieldChange,
					})}
				/>
				<FieldGroup className="gap-4 flex-col sm:flex-row">
					<FormField
						label={t("address.phone")}
						placeholder={t("address.phone_placeholder")}
						error={errors.phone?.message}
						register={register("phone", {
							onChange: handleFieldChange,
							onBlur: handleFieldChange,
						})}
						type="tel"
					/>
					<FormField
						label={t("address.email")}
						placeholder={t("address.email_placeholder")}
						error={errors.email?.message}
						register={register("email", {
							onChange: handleFieldChange,
							onBlur: handleFieldChange,
						})}
						type="email"
					/>
				</FieldGroup>
				<FieldGroup className="gap-4 flex-col sm:flex-row">
					<FormField
						label={t("address.city")}
						placeholder={t("address.city_placeholder")}
						error={errors.city?.message}
						register={register("city", {
							onChange: handleFieldChange,
							onBlur: handleFieldChange,
						})}
					/>
					<FormField
						label={t("address.address")}
						placeholder={t("address.address_placeholder")}
						error={errors.address?.message}
						register={register("address", {
							onChange: handleFieldChange,
							onBlur: handleFieldChange,
						})}
					/>
				</FieldGroup>
			</FieldSet>
		</Activity>
	)
}
