import { Button } from "@/ui/Button";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import { Label } from "@/ui/label";
import { Trash2 } from "lucide-react";
import { CategoryFieldProps } from "./types";
import { FIELD_TYPE_OPTIONS } from "../types";

export default function CategoryField({
	index,
	register,
	errors,
	onRemove,
}: CategoryFieldProps) {
	return (
		<div className="grid gap-2 border rounded-md p-3">
			<div className="flex items-center justify-between mb-1">
				<Label>Field {index + 1}</Label>
				<Button
					type="button"
					variant="ghost"
					size="icon-sm"
					onClick={() => onRemove(index)}
					className="text-destructive hover:text-destructive"
				>
					<Trash2 className="size-4" />
				</Button>
			</div>
			<div className="grid grid-cols-2 gap-3">
				<div className="grid gap-2">
					<Label htmlFor={`field-name-${index}`}>Field Name</Label>
					<Input
						id={`field-name-${index}`}
						placeholder="Field name"
						{...register(`fields.${index}.name` as const)}
						className={
							errors.fields?.[index]?.name ? "border-destructive" : ""
						}
					/>
					{errors.fields?.[index]?.name && (
						<p className="text-sm text-destructive">
							{errors.fields[index]?.name?.message}
						</p>
					)}
				</div>
				<div className="grid gap-2">
					<Label htmlFor={`field-type-${index}`}>Field Type</Label>
					<Select
						id={`field-type-${index}`}
						defaultValue="checkbox"
						{...register(`fields.${index}.type` as const)}
					>
						{FIELD_TYPE_OPTIONS.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</Select>
				</div>
			</div>
		</div>
	);
}
