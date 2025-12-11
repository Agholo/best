"use client";

import { Separator } from "@/ui/separator";
import { facebookUrl, footerInfoGroups, instagramUrl } from "./data";
import InfoGroup from "./InfoGroup";
import Text from "@/ui/Text";
import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  return (
    <footer className="w-full bg-background-tint1">
      <div className="w-(--content-width) mx-auto flex justify-between items-center py-8 flex-col">
        <div className="flex justify-between items-center gap-6 w-full">
          {footerInfoGroups.map((infoGroup) => (
            <InfoGroup key={infoGroup.titleKey} {...infoGroup} />
          ))}
        </div>
        <Separator className="my-8 w-full"/>
        <div className="flex justify-between items-center gap-6 w-full">
          <Text color="tint1" size="sm">© {year} WebAPP. {t("rights_reserved")}</Text>
          <div className="flex items-center gap-2">
            <Link href={facebookUrl}>
              <Facebook className="fill-(--color-accent)"/>
            </Link>
            <Link href={instagramUrl}>
              <Instagram />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}