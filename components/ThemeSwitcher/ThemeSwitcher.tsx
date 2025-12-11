"use client";

import useTheme from "@/hooks/useTheme";
import { Button } from "@/ui/Button";
import { Moon, Sun } from "lucide-react";

export default function ThemeSwitcher() {
	const { theme, toggleTheme } = useTheme();

	return (
		<Button onClick={toggleTheme} variant="ghost" size="icon">
			{theme === "dark" ? <Sun /> : <Moon />}
		</Button>
	);
}