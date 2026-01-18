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
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useProductForm } from "./data";
import { ProductPopupProps } from "./types";
import axios from "axios";
import { CategoryField } from "@/utils/getCategoryFilterableFields";
import Text from "@/ui/Text";
import AdditionalField from "./AdditionalField";
import { Plus } from "lucide-react";

interface AdditionalFieldData {
	id: string;
	name: string;
	value: string;
}

export default function ProductPopup({ children, category, onSuccess }: ProductPopupProps) {
	const { t } = useTranslation("category");
	const [open, setOpen] = useState(false);
	const [categoryFields, setCategoryFields] = useState<CategoryField[]>([]);
	const [additionalFields, setAdditionalFields] = useState<AdditionalFieldData[]>([]);
	const { form, onSubmit, isSubmitting, submitError, submitSuccess } = useProductForm(category);
	const {
		register,
		watch,
		setValue,
		reset,
		formState: { errors },
	} = form;

	const filterableFields = watch("filterableFields") || {};

	// Reset form and additional fields when dialog closes
	const handleOpenChange = (newOpen: boolean): void => {
		if (!newOpen) {
			reset();
			setAdditionalFields([]);
		}
		setOpen(newOpen);
	};

	useEffect(() => {
		if (category) {
			setValue("category", category);
		}
	}, [category, setValue]);

	useEffect(() => {
		const fetchCategory = async (): Promise<void> => {
			if (!category || !open) return;

			try {
				const response = await axios.get(`/api/categories?name=${encodeURIComponent(category)}`);
				if (response.data?.category?.fields) {
					const fields = response.data.category.fields as CategoryField[];
					setCategoryFields(fields);
					// Initialize filterable fields for the category
					const initialFields: Record<string, string> = {};
					fields.forEach((field: CategoryField) => {
						initialFields[field.name] = "";
					});
					setValue("filterableFields", initialFields);
				}
			} catch (error) {
				console.error("Failed to fetch category:", error);
			}
		};

		fetchCategory();
	}, [category, open, setValue]);

	useEffect(() => {
		// Sync additional fields state with form
		const fieldsObj: Record<string, string> = {};
		additionalFields.forEach((field) => {
			if (field.name && field.value) {
				fieldsObj[field.name] = field.value;
			}
		});
		setValue("additionalFields", fieldsObj);
	}, [additionalFields, setValue]);

	const handleSubmitClick = (): void => {
		// Validate category fields are filled
		const missingFields: string[] = [];
		categoryFields.forEach((field) => {
			if (!filterableFields[field.name] || filterableFields[field.name].trim() === "") {
				missingFields.push(field.name);
			}
		});

		if (missingFields.length > 0) {
			form.setError("filterableFields", {
				type: "manual",
				message: `Please fill in all required fields: ${missingFields.join(", ")}`,
			});
			return;
		}

		const submitHandler = onSubmit(() => {
			setOpen(false);
			if (onSuccess) {
				onSuccess();
			}
		});
		submitHandler();
	};

	const addAdditionalField = (): void => {
		setAdditionalFields([
			...additionalFields,
			{
				id: `additional-${Date.now()}-${Math.random()}`,
				name: "",
				value: "",
			},
		]);
	};

	const removeAdditionalField = (index: number): void => {
		setAdditionalFields(additionalFields.filter((_, i) => i !== index));
	};

	const handleAdditionalFieldNameChange = (index: number, name: string): void => {
		const updated = [...additionalFields];
		updated[index] = { ...updated[index], name };
		setAdditionalFields(updated);
	};

	const handleAdditionalFieldValueChange = (index: number, value: string): void => {
		const updated = [...additionalFields];
		updated[index] = { ...updated[index], value };
		setAdditionalFields(updated);
	};

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<form>
				<DialogTrigger asChild>{children}</DialogTrigger>
				<DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>{t("product.add_product") || "Add Product"}</DialogTitle>
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
									Product created successfully!
								</p>
							</div>
						)}

						<div className="grid gap-3">
							<Label htmlFor="name">Name *</Label>
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
							<Label htmlFor="description">Description *</Label>
							<textarea
								id="description"
								{...register("description")}
								className={`min-h-[100px] rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] ${errors.description ? "border-destructive" : ""}`}
							/>
							{errors.description && (
								<p className="text-sm text-destructive">{errors.description.message}</p>
							)}
						</div>

						<div className="grid gap-3">
							<Label htmlFor="image">Image URL *</Label>
							<Input
								id="image"
								type="url"
								{...register("image")}
								className={errors.image ? "border-destructive" : ""}
								placeholder="https://example.com/image.jpg"
							/>
							{errors.image && (
								<p className="text-sm text-destructive">{errors.image.message}</p>
							)}
						</div>

						<div className="grid gap-3">
							<Label htmlFor="stock">Stock *</Label>
							<Input
								id="stock"
								type="number"
								min="0"
								{...register("stock", { valueAsNumber: true })}
								className={errors.stock ? "border-destructive" : ""}
							/>
							{errors.stock && (
								<p className="text-sm text-destructive">{errors.stock.message}</p>
							)}
						</div>

						{categoryFields.length > 0 && (
							<div className="grid gap-3 border-t pt-4">
								<Text weight="semibold" className="mb-2">
									Category Fields (Required) *
								</Text>
								{categoryFields.map((field) => (
									<div key={field.id} className="grid gap-2">
										<Label htmlFor={`filterable-${field.name}`}>
											{field.name} {field.type === "range" && "(Price)"} *
										</Label>
										{field.type === "range" ? (
											<Input
												id={`filterable-${field.name}`}
												type="number"
												step="0.01"
												required
												value={filterableFields[field.name] || ""}
												onChange={(e) => {
													setValue("filterableFields", {
														...filterableFields,
														[field.name]: e.target.value,
													}, { shouldValidate: true });
												}}
												placeholder="Enter price"
												className={!filterableFields[field.name] ? "border-destructive" : ""}
											/>
										) : (
											<Input
												id={`filterable-${field.name}`}
												required
												value={filterableFields[field.name] || ""}
												onChange={(e) => {
													setValue("filterableFields", {
														...filterableFields,
														[field.name]: e.target.value,
													}, { shouldValidate: true });
												}}
												placeholder={`Enter ${field.name}`}
												className={!filterableFields[field.name] ? "border-destructive" : ""}
											/>
										)}
										{!filterableFields[field.name] && (
											<p className="text-sm text-destructive">
												{field.name} is required
											</p>
										)}
									</div>
								))}
							</div>
						)}

						<div className="grid gap-3 border-t pt-4">
							<div className="flex items-center justify-between">
								<Text weight="semibold">Additional Fields (Optional)</Text>
								<Button
									type="button"
									variant="outline"
									size="sm"
									onClick={addAdditionalField}
									className="flex items-center gap-2"
								>
									<Plus className="size-4" />
									Add Field
								</Button>
							</div>
							<div className="grid gap-3">
								{additionalFields.map((field, index) => (
									<AdditionalField
										key={field.id}
										index={index}
										fieldName={field.name}
										fieldValue={field.value}
										onFieldNameChange={handleAdditionalFieldNameChange}
										onFieldValueChange={handleAdditionalFieldValueChange}
										onRemove={removeAdditionalField}
									/>
								))}
								{additionalFields.length === 0 && (
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
							{isSubmitting ? "Saving..." : "Add Product"}
						</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
}
