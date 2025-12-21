import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen w-full flex flex-col">
			<Header />
			<main className="flex-1 w-full max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8">
				{children}
			</main>
			<Footer />
		</div>
	);
}