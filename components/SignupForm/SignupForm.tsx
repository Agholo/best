"use client";

import { Field, FieldContent, FieldLabel } from "@/ui/field";
import Input from "@/ui/Input";
import { Button } from "@/ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupFormData } from "@/app/auth/schemas";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupForm() {
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
  );
}

