import { UseFormRegister, FieldErrors } from "react-hook-form";
import { PaymentDetailsData } from "../types";

export interface CardFormFieldsProps {
	register: UseFormRegister<PaymentDetailsData>;
	errors: FieldErrors<PaymentDetailsData>;
	onCardNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onExpirationDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onCVVChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

