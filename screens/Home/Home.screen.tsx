import HeroBanner from "@/components/HeroBanner";
import Categories from "@/components/Categories";

export default function Home() {
	return (
		<div className="w-full space-y-8 sm:space-y-12 md:space-y-16">
			<HeroBanner />
			<Categories />
		</div>
	)
}