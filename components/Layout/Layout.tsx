import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen w-full flex flex-col">
			<Header />
			<main className="flex-1 w-(--content-width) mx-auto">
				{children}
			</main>
			<Footer />
		</div>
	);
}