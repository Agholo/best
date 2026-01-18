import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productFormSchema, type ProductFormData } from "./types";
import axios from "axios";
import { useState } from "react";

export function useProductForm(defaultCategory?: string) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [submitSuccess, setSubmitSuccess] = useState(false);

	const form = useForm<ProductFormData>({
		resolver: zodResolver(productFormSchema),
		defaultValues: {
			name: "",
			description: "",
			image: "",
			stock: 0,
			category: defaultCategory || "",
			filterableFields: {},
			additionalFields: {},
		},
	});

	const onSubmit = async (
		data: ProductFormData,
		onSuccess?: () => void
	): Promise<void> => {
		setIsSubmitting(true);
		setSubmitError(null);
		setSubmitSuccess(false);

		try {
			const response = await axios.post("/api/products", data);

			if (response.status === 201) {
				setSubmitSuccess(true);
				form.reset();
				if (onSuccess) {
					onSuccess();
				}
			}
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				setSubmitError(
					error.response.data?.error || "Failed to create product"
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
		onSubmit: createSubmitHandler,
		isSubmitting,
		submitError,
		submitSuccess,
	};
}

