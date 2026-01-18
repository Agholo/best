import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/ui/dialog";
import { Button } from "@/ui/Button";
import { DeleteConfirmationDialogProps } from "./types";
import { AlertTriangle } from "lucide-react";

export default function DeleteConfirmationDialog({
	open,
	onOpenChange,
	onConfirm,
	title = "Delete Item",
	description,
}: DeleteConfirmationDialogProps): React.ReactElement {
	const handleConfirm = (): void => {
		onConfirm();
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<div className="flex items-center gap-3">
						<div className="flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10">
							<AlertTriangle className="size-6 text-destructive" />
						</div>
						<DialogTitle>{title}</DialogTitle>
					</div>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline" onClick={() => onOpenChange(false)}>
						Cancel
					</Button>
					<Button variant="destructive" onClick={handleConfirm}>
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

