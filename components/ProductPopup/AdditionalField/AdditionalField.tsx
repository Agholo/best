import { Button } from "@/ui/Button";
import Input from "@/ui/Input";
import { Label } from "@/ui/label";
import { Trash2 } from "lucide-react";
import { AdditionalFieldProps } from "./types";

export default function AdditionalField({
	index,
	fieldName,
	fieldValue,
	onFieldNameChange,
	onFieldValueChange,
	onRemove,
}: AdditionalFieldProps): React.ReactElement {
	return (
		<div className="grid gap-2 border rounded-md p-3">
			<div className="flex items-center justify-between mb-1">
				<Label>Additional Field {index + 1}</Label>
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
					<Label htmlFor={`additional-field-name-${index}`}>Field Name</Label>
					<Input
						id={`additional-field-name-${index}`}
						placeholder="Field name"
						value={fieldName}
						onChange={(e) => onFieldNameChange(index, e.target.value)}
					/>
				</div>
				<div className="grid gap-2">
					<Label htmlFor={`additional-field-value-${index}`}>Field Value</Label>
					<Input
						id={`additional-field-value-${index}`}
						placeholder="Field value"
						value={fieldValue}
						onChange={(e) => onFieldValueChange(index, e.target.value)}
					/>
				</div>
			</div>
		</div>
	);
}

