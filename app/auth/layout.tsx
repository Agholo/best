export default function AuthLayout({ children }: { children: React.ReactNode }): React.ReactNode {
	// Auth redirect is now handled by middleware for static rendering
	return children;
}