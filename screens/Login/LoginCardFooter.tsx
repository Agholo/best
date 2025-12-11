"use client";

import { useRouter } from "next/navigation";

export default function LoginCardFooter() {
	const router = useRouter();
	return (
		<p className="text-center text-sm text-muted-foreground">
			{"Don't have an account?"}{" "}
			<button
				type="button"
				onClick={() => router.push("/auth/signup")}
				className="text-primary hover:underline"
			>
        Sign up
			</button>
		</p>
	)
}