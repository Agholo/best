export interface PaymentMethodItemProps {
	method: string;
	title: string;
	description?: string;
	isSelected: boolean;
	onSelect: (method: string) => void;
	children?: React.ReactNode;
}

