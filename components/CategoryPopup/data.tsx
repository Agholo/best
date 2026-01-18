import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categoryFormSchema, type CategoryFormData } from "./types";
import axios from "axios";
import { useState } from "react";

export function useCategoryForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [submitSuccess, setSubmitSuccess] = useState(false);

	const form = useForm<CategoryFormData>({
		resolver: zodResolver(categoryFormSchema),
		defaultValues: {
			name: "",
			icon: "",
			fields: [],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "fields",
	});

	const addField = (): void => {
		append({
			id: `field-${Date.now()}-${Math.random()}`,
			name: "",
			type: "",
		});
	};

	const removeField = (index: number): void => {
		remove(index);
	};

	const onSubmit = async (
		data: CategoryFormData,
		onSuccess?: () => void
	): Promise<void> => {
		setIsSubmitting(true);
		setSubmitError(null);
		setSubmitSuccess(false);

		try {
			const response = await axios.post("/api/categories", {
				name: data.name,
				icon: data.icon,
				fields: data.fields,
			});

			if (response.status === 201) {
				setSubmitSuccess(true);
				// Reset form after successful submission
				form.reset();
				// Call success callback if provided
				if (onSuccess) {
					onSuccess();
				}
			}
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				setSubmitError(
					error.response.data?.error || "Failed to create category"
				);
			} else {
				setSubmitError("An unexpected error occurred");
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	const createSubmitHandler = (onSuccess?: () => void) => {
		return form.handleSubmit((data) => {
			onSubmit(data, onSuccess);
		});
	};

	return {
		form,
		fields,
		addField,
		removeField,
		onSubmit: createSubmitHandler,
		isSubmitting,
		submitError,
		submitSuccess,
	};
}

