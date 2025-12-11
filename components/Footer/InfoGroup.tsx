import Link from "next/link";
import { FooterInfoGroup } from "./types";
import Text from "@/ui/Text";
import { useTranslation } from "react-i18next";

export default function InfoGroup({ titleKey, links }: FooterInfoGroup) {
  const { t } = useTranslation("footer");
  return (
    <div className="flex flex-col gap-6">
      <Text type="h6" size="md" weight="semibold">{t(titleKey)}</Text>
      <div className="flex flex-col gap-3">
        {links.map((link) => (
          <Link href={link.href} key={link.labelKey}>
            <Text color="tint1" size="sm">{t(link.labelKey)}</Text>
          </Link>
        ))}
      </div>
    </div>
  )
}