import { Slider } from "@/ui/slider";
import { RangeFilterFieldProps } from "./types";

export default function RangeFilterField({
	fieldName,
	range,
	currentValue,
	onChange,
	onCommit,
}: RangeFilterFieldProps) {
	return (
		<div key={fieldName}>
			<Slider
				value={[Number(currentValue.min), Number(currentValue.max)]}
				min={Number(range.min)}
				max={Number(range.max)}
				onValueChange={onChange}
				onValueCommit={onCommit}
			/>
			<div className="flex items-center justify-between my-2">
				<p>{currentValue.min}</p>
				<p>{currentValue.max}</p>
			</div>
		</div>
	);
}

