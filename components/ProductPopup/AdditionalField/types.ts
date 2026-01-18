export interface AdditionalFieldProps {
	index: number;
	fieldName: string;
	fieldValue: string;
	onFieldNameChange: (index: number, name: string) => void;
	onFieldValueChange: (index: number, value: string) => void;
	onRemove: (index: number) => void;
}

