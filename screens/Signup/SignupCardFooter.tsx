"use client";

import { useRouter } from "next/navigation";

export default function SignupCardFooter() {
  const router = useRouter();
  return (
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
  );
}

