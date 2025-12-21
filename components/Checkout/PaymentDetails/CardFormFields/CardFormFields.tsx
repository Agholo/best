import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "@/ui/field";
import Input from "@/ui/Input";
import { CardFormFieldsProps } from "./types";
import { useTranslation } from "react-i18next";

export default function CardFormFields({ register, errors, onCardNumberChange, onExpirationDateChange, onCVVChange }: CardFormFieldsProps) {
	const { t } = useTranslation("checkout");

	return (
		<div className="flex flex-col gap-6">
			<Field>
				<FieldLabel>{t("payment.card_form.card_number")}</FieldLabel>
				<FieldContent>
					<Input
						type="text"
						placeholder={t("payment.card_form.card_number_placeholder")}
						maxLength={23}
						{...register("cardNumber", {
							onChange: (e) => {
								onCardNumberChange(e);
							},
						})}
						required
					/>
					{errors.cardNumber && (
						<FieldError>{errors.cardNumber.message}</FieldError>
					)}
				</FieldContent>
			</Field>
			<Field>
				<FieldLabel>{t("payment.card_form.name_on_card")}</FieldLabel>
				<FieldContent>
					<Input
						type="text"
						placeholder={t("payment.card_form.name_on_card_placeholder")}
						{...register("nameOnCard")}
						required
					/>
					{errors.nameOnCard && (
						<FieldError>{errors.nameOnCard.message}</FieldError>
					)}
				</FieldContent>
			</Field>
			<FieldGroup className="gap-4 flex-row">
				<Field>
					<FieldLabel>{t("payment.card_form.expiration_date")}</FieldLabel>
					<FieldContent>
						<Input
							type="text"
							placeholder={t("payment.card_form.expiration_date_placeholder")}
							maxLength={5}
							{...register("expirationDate", {
								onChange: (e) => {
									onExpirationDateChange(e);
								},
							})}
							required
						/>
						{errors.expirationDate && (
							<FieldError>{errors.expirationDate.message}</FieldError>
						)}
					</FieldContent>
				</Field>
				<Field>
					<FieldLabel>{t("payment.card_form.cvv")}</FieldLabel>
					<FieldContent>
						<Input
							type="text"
							placeholder={t("payment.card_form.cvv_placeholder")}
							maxLength={4}
							{...register("cvv", {
								onChange: (e) => {
									onCVVChange(e);
								},
							})}
							required
						/>
						{errors.cvv && (
							<FieldError>{errors.cvv.message}</FieldError>
						)}
					</FieldContent>
				</Field>
			</FieldGroup>
		</div>
	);
}

