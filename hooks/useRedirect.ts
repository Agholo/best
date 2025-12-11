
import { useRouter, redirect } from "next/navigation";

export default function useRedirect(action: "push" | "replace" = 'push') {
	const router = useRouter();

	const actionMap = {
		push: router.push,
		replace: router.replace,
	}

	return {
		refresh: () => router.refresh(),
		navigate: (path: string) => actionMap[action](path),
		redirect: (path: string) => redirect(path),
	}
}
