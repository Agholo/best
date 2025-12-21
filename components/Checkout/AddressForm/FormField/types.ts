import { UseFormRegisterReturn } from "react-hook-form";

export interface FormFieldProps {
	label: string;
	placeholder: string;
	error?: string;
	register: UseFormRegisterReturn;
	type?: "text" | "email" | "tel";
}

