import { Checkbox } from "@/ui/Checkbox";
import { Label } from "@/ui/label";
import { CheckboxFilterFieldProps } from "./types";

export default function CheckboxFilterField({
	fieldName,
	options,
	currentFilter,
	onChange,
}: CheckboxFilterFieldProps): JSX.Element {
	const isChecked = (item: string): boolean => {
		return Array.isArray(currentFilter) && currentFilter.includes(item);
	};

	return (
		<>
			{options.map((item) => (
				<div key={item} className="flex items-center gap-2 my-2">
					<Checkbox
						id={`${fieldName}-${item}`}
						checked={isChecked(item)}
						onCheckedChange={(checked) => onChange(fieldName, item, checked === true)}
					/>
					<Label htmlFor={`${fieldName}-${item}`}>{item}</Label>
				</div>
			))}
		</>
	);
}

