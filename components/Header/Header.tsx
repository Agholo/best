import Text from "@/ui/Text";
import SearchBar from "../SearchBar";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import LanguageSwitcher from "../LanguageSwitcher";

export default function Header() {
  return (
    <header className="w-full flex justify-between items-center h-(--header-height) bg-background-tint1">
      <div className="w-(--content-width) mx-auto flex justify-between items-center">
        <Text className="text-2xl font-bold">WebAPP</Text>
        <SearchBar />
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}