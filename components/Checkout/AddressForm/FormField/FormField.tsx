import { Field, FieldContent, FieldError, FieldLabel } from "@/ui/field";
import Input from "@/ui/Input";
import { FormFieldProps } from "./types";

export default function FormField({
	label,
	placeholder,
	error,
	register,
	type = "text",
}: FormFieldProps) {
	return (
		<Field>
			<FieldLabel>{label}</FieldLabel>
			<FieldContent>
				<Input
					type={type}
					placeholder={placeholder}
					{...register}
				/>
				{error && (
					<FieldError>{error}</FieldError>
				)}
			</FieldContent>
		</Field>
	);
}

