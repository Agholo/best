"use client";

import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const useTheme = create<ThemeState>((set, get) => ({
	theme: "dark",
	setTheme: (theme) => set({ theme }),
	toggleTheme: () =>
		set({ theme: get().theme === "dark" ? "light" : "dark" }),
}));

export default useTheme;
