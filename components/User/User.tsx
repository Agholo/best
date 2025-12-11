"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Avatar, AvatarFallback } from "@/ui/Avatar";
import { Button } from "@/ui/Button";
import { PopoverTrigger, PopoverContent, Popover } from "@/ui/Popover";

export default function User() {
	const { data: session, status } = useSession();

	if (status === "loading") {
		return (
			<div>
				<Avatar>
					<AvatarFallback>...</AvatarFallback>
				</Avatar>
			</div>
		);
	}

	if (!session) {
		return (
			<Button onClick={() => signIn()} variant="outline" size="sm">
        Sign In
			</Button>
		);
	}

	const userInitials = session.user?.name
		?.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2) || session.user?.email?.[0].toUpperCase() || "U";

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Avatar>
					<AvatarFallback>{userInitials}</AvatarFallback>
				</Avatar>
			</PopoverTrigger>
			<PopoverContent className="w-80">
				<Button onClick={() => signOut()}>Sign Out</Button>
			</PopoverContent>
		</Popover>
	);
}
