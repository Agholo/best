import Text from "@/ui/Text";
import SearchBar from "../SearchBar";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import LanguageSwitcher from "../LanguageSwitcher";
import CartIcon from "./CartIcon";
import Link from "next/link";
import User from "@/components/User";

export default function Header() {
  return (
    <header className="w-full flex justify-between items-center h-(--header-height) bg-background-tint1">
      <div className="w-(--content-width) mx-auto flex justify-between items-center">
        <Link href="/home">
          <Text className="text-2xl font-bold">WebAPP</Text>
        </Link>
        <SearchBar />
        <div className="flex items-center gap-2">
          <CartIcon />
          <ThemeSwitcher />
          <LanguageSwitcher />
          <User />
        </div>
      </div>
    </header>
  );
}