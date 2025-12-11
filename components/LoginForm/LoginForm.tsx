"use client";

import { Field, FieldContent, FieldLabel } from "@/ui/field";
import Input from "@/ui/Input";
import { Button } from "@/ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/app/auth/schemas";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (data: LoginFormData) => {
		try {
			const result = await signIn("credentials", {
				email: data.email,
				password: data.password,
				redirect: false,
			});

			if (result?.error) {
				setError("root", {
					message: "Invalid email or password",
				});
				return;
			}

			router.push("/home");
			router.refresh();
		} catch {
			setError("root", {
				message: "An error occurred. Please try again.",
			});
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<Field>
				<FieldLabel>Email</FieldLabel>
				<FieldContent>
					<Input
						type="email"
						placeholder="you@example.com"
						disabled={isSubmitting}
						{...register("email")}
					/>
					{errors.email && (
						<p className="mt-1 text-sm text-destructive">
							{errors.email.message}
						</p>
					)}
				</FieldContent>
			</Field>

			<Field>
				<FieldLabel>Password</FieldLabel>
				<FieldContent>
					<Input
						type="password"
						placeholder="••••••••"
						disabled={isSubmitting}
						{...register("password")}
					/>
					{errors.password && (
						<p className="mt-1 text-sm text-destructive">
							{errors.password.message}
						</p>
					)}
				</FieldContent>
			</Field>

			{errors.root && (
				<div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
					{errors.root.message}
				</div>
			)}

			<Button type="submit" className="w-full" disabled={isSubmitting}>
				{isSubmitting ? "Signing in..." : "Login"}
			</Button>
		</form>
	);
}
