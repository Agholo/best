"use client";

import { Button } from "@/ui/Button";
import { Field, FieldContent, FieldLabel } from "@/ui/field";
import Input from "@/ui/Input";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/ui/Card";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupFormData } from "../schemas";
import axios from "axios";

export default function SignupPage() {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = useForm<SignupFormData>({
		resolver: zodResolver(signupSchema),
	});

	const onSubmit = async (data: SignupFormData) => {
		try {
			// Call signup API
			await axios.post("/api/auth/signup", {
				email: data.email,
				password: data.password,
				name: data.name || undefined,
			});

			// Auto sign in after successful signup
			const signInResult = await signIn("credentials", {
				email: data.email,
				password: data.password,
				redirect: false,
			});

			if (signInResult?.error) {
				setError("root", {
					message: "Account created but failed to sign in. Please try logging in.",
				});
				return;
			}

			// Redirect to home page
			router.push("/home");
			router.refresh();
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				setError("root", {
					message: error.response.data?.error || "An error occurred during signup",
				});
			} else {
				setError("root", {
					message: "An error occurred. Please try again.",
				});
			}
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl">Sign Up</CardTitle>
					<CardDescription>
						Create an account to get started
					</CardDescription>
				</CardHeader>

				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<Field>
							<FieldLabel>Name (Optional)</FieldLabel>
							<FieldContent>
								<Input
									type="text"
									placeholder="Your name"
									disabled={isSubmitting}
									{...register("name")}
								/>
								{errors.name && (
									<p className="mt-1 text-sm text-destructive">
										{errors.name.message}
									</p>
								)}
							</FieldContent>
						</Field>

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
							{isSubmitting ? "Creating account..." : "Sign Up"}
						</Button>
					</form>
				</CardContent>

				<CardFooter className="flex justify-center">
					<p className="text-center text-sm text-muted-foreground">
						Already have an account?{" "}
						<button
							type="button"
							onClick={() => router.push("/auth/login")}
							className="text-primary hover:underline"
						>
							Sign in
						</button>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
