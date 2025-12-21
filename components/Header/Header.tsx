import Text from "@/ui/Text";
import SearchBar from "../SearchBar";
import CartIcon from "./CartIcon";
import Link from "next/link";
import User from "@/components/User";

export default function Header() {
	return (
		<header className="w-full flex justify-between items-center h-16 sm:h-20 md:h-24 lg:h-[100px] bg-background-tint1">
			<div className="w-full max-w-[80%] mx-auto flex flex-row justify-between items-center gap-2 sm:gap-4 px-4 sm:px-6 lg:px-8">
				<Link href="/home" className="hidden sm:block">
					<Text className="text-xl sm:text-2xl font-bold">WebAPP</Text>
				</Link>
				<SearchBar />
				<div className="flex items-center gap-3">
					<CartIcon />
					<User />
				</div>
			</div>
		</header>
	);
}