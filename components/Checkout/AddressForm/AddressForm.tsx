"use client";

import { useCheckoutSteps } from "@/hooks/useCheckoutSteps";
import { Field, FieldContent, FieldLabel, FieldSet, FieldError, FieldGroup } from "@/ui/field";
import Input from "@/ui/Input";
import { Activity, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressFormSchema, type AddressFormData } from "./types";
import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";
import useCheckout from "@/hooks/useCheckout";
import useCheckoutValidation from "@/hooks/useCheckoutValidation";

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
				<Field>
					<FieldLabel>{t("address.full_name")}</FieldLabel>
					<FieldContent>
						<Input
							type="text"
							placeholder={t("address.full_name_placeholder")}
							{...register("fullName", {
								onChange: handleFieldChange,
								onBlur: handleFieldChange,
							})}
						/>
						{errors.fullName && (
							<FieldError>{errors.fullName.message}</FieldError>
						)}
					</FieldContent>
				</Field>
				<FieldGroup className="gap-4 flex-row">
					<Field>
						<FieldLabel>{t("address.phone")}</FieldLabel>
						<FieldContent>
							<Input
								type="text"
								placeholder={t("address.phone_placeholder")}
								{...register("phone", {
									onChange: handleFieldChange,
									onBlur: handleFieldChange,
								})}
							/>
							{errors.phone && (
								<FieldError>{errors.phone.message}</FieldError>
							)}
						</FieldContent>
					</Field>
					<Field>
						<FieldLabel>{t("address.email")}</FieldLabel>
						<FieldContent>
							<Input
								type="email"
								placeholder={t("address.email_placeholder")}
								{...register("email", {
									onChange: handleFieldChange,
									onBlur: handleFieldChange,
								})}
							/>
							{errors.email && (
								<FieldError>{errors.email.message}</FieldError>
							)}
						</FieldContent>
					</Field>
				</FieldGroup>
				<FieldGroup className="gap-4 flex-row">
					<Field>
						<FieldLabel>{t("address.city")}</FieldLabel>
						<FieldContent>
							<Input
								type="text"
								placeholder={t("address.city_placeholder")}
								{...register("city", {
									onChange: handleFieldChange,
									onBlur: handleFieldChange,
								})}
							/>
							{errors.city && (
								<FieldError>{errors.city.message}</FieldError>
							)}
						</FieldContent>
					</Field>
					<Field>
						<FieldLabel>{t("address.address")}</FieldLabel>
						<FieldContent>
							<Input
								type="text"
								placeholder={t("address.address_placeholder")}
								{...register("address", {
									onChange: handleFieldChange,
									onBlur: handleFieldChange,
								})}
							/>
							{errors.address && (
								<FieldError>{errors.address.message}</FieldError>
							)}
						</FieldContent>
					</Field>
				</FieldGroup>
			</FieldSet>
		</Activity>
	)
}
