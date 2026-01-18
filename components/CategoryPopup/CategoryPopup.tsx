import { Button } from "@/ui/Button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/ui/dialog";
import Input from "@/ui/Input";
import { Label } from "@/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/Popover";
import { useTranslation } from "react-i18next";
import { Plus, HelpCircle, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useCategoryForm } from "./data";
import { CategoryPopupProps } from "./types";
import CategoryField from "./CategoryField";

export default function CategoryPopup({ children, onSuccess }: CategoryPopupProps) {
	const { t } = useTranslation("categories");
	const [open, setOpen] = useState(false);
	const [tooltipOpen, setTooltipOpen] = useState(false);
	const { form, fields, addField, removeField, onSubmit, isSubmitting, submitError, submitSuccess } = useCategoryForm();
	const {
		register,
		formState: { errors },
	} = form;

	const handleSubmitClick = (): void => {
		const submitHandler = onSubmit(() => {
			// Close dialog on successful submission
			setOpen(false);
			// Call onSuccess callback if provided
			if (onSuccess) {
				onSuccess();
			}
		});
		submitHandler();
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<form>
				<DialogTrigger asChild>{children}</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>{t("Add Category")}</DialogTitle>
					</DialogHeader>
					<div className="grid gap-4">
						{submitError && (
							<div className="rounded-md bg-destructive/10 border border-destructive/20 p-3">
								<p className="text-sm text-destructive">{submitError}</p>
							</div>
						)}
						{submitSuccess && (
							<div className="rounded-md bg-green-500/10 border border-green-500/20 p-3">
								<p className="text-sm text-green-600 dark:text-green-400">
									Category created successfully!
								</p>
							</div>
						)}
						<div className="grid gap-3">
							<Label htmlFor="name">Name</Label>
							<Input
								id="name"
								{...register("name")}
								className={errors.name ? "border-destructive" : ""}
							/>
							{errors.name && (
								<p className="text-sm text-destructive">{errors.name.message}</p>
							)}
						</div>
						<div className="grid gap-3">
							<div className="flex items-center gap-2">
								<Label htmlFor="icon">Icon</Label>
								<Popover open={tooltipOpen} onOpenChange={setTooltipOpen}>
									<PopoverTrigger asChild>
										<button
											type="button"
											className="inline-flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
											aria-label="Icon help"
											onMouseEnter={() => setTooltipOpen(true)}
											onMouseLeave={() => setTooltipOpen(false)}
										>
											<HelpCircle className="size-4 text-muted-foreground hover:text-foreground" />
										</button>
									</PopoverTrigger>
									<PopoverContent
										className="w-80"
										align="start"
										onMouseEnter={() => setTooltipOpen(true)}
										onMouseLeave={() => setTooltipOpen(false)}
									>
										<div className="space-y-2">
											<p className="text-sm font-medium">How to set icon name</p>
											<p className="text-sm text-muted-foreground">
												Copy the icon name from Lucide Icons. The icon name should match exactly as shown on the Lucide website.
											</p>
											<a
												href="https://lucide.dev/icons"
												target="_blank"
												rel="noopener noreferrer"
												className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
											>
												View Lucide Icons
												<ExternalLink className="size-3" />
											</a>
										</div>
									</PopoverContent>
								</Popover>
							</div>
							<Input
								id="icon"
								{...register("icon")}
								className={errors.icon ? "border-destructive" : ""}
							/>
							{errors.icon && (
								<p className="text-sm text-destructive">{errors.icon.message}</p>
							)}
						</div>
						<div className="grid gap-3">
							<div className="flex items-center justify-between">
								<Label>Additional Fields</Label>
								<Button
									type="button"
									variant="outline"
									size="sm"
									onClick={addField}
									className="flex items-center gap-2"
								>
									<Plus className="size-4" />
									Add Field
								</Button>
							</div>
							<div className="grid gap-3">
								{fields.map((field, index) => (
									<CategoryField
										key={field.id}
										field={field}
										index={index}
										register={register}
										errors={errors}
										onRemove={removeField}
									/>
								))}
								{fields.length === 0 && (
									<p className="text-sm text-muted-foreground text-center py-4">
										No additional fields. Click &quot;Add Field&quot; to add one.
									</p>
								)}
							</div>
						</div>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button type="button" variant="outline" disabled={isSubmitting}>
								Cancel
							</Button>
						</DialogClose>
						<Button type="button" onClick={handleSubmitClick} disabled={isSubmitting}>
							{isSubmitting ? "Saving..." : "Save changes"}
						</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
}
