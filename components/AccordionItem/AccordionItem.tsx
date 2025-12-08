import { AccordionContent, AccordionItem as AccordionUiItem } from "@radix-ui/react-accordion";
import { AccordionProps } from "./types";
import { AccordionTrigger } from "@/ui/Accordion";

export default function AccordionItem({ title, children }: AccordionProps) {
	return (
		<AccordionUiItem value={title}>
			<AccordionTrigger>{title}</AccordionTrigger>
			<AccordionContent>
					{children}
			</AccordionContent>
		</AccordionUiItem>
	);
}