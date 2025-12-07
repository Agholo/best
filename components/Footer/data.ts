import { FooterInfoGroup } from "./types";

import { FooterInfoGroup } from "./types";

export const footerInfoGroups: FooterInfoGroup[] = [
	{
		titleKey: "shop.title",
		links: [
			{
				labelKey: "shop.links.all_products",
				href: "/products"
			},
			{
				labelKey: "shop.links.categories",
				href: "/categories"
			},
			{
				labelKey: "shop.links.brands",
				href: "/brands"
			},
			{
				labelKey: "shop.links.best_sellers",
				href: "/best-sellers"
			},
		]
	},
	{
		titleKey: "support.title",
		links: [
			{
				labelKey: "support.links.help_center",
				href: "/help-center"
			},
			{
				labelKey: "support.links.contact_us",
				href: "/contact-us"
			},
			{
				labelKey: "support.links.shipping_info",
				href: "/shipping-info"
			},
			{
				labelKey: "support.links.returns",
				href: "/returns"
			},
		]
	},
	{
		titleKey: "company.title",
		links: [
			{
				labelKey: "company.links.about",
				href: "/about"
			},
			{
				labelKey: "company.links.careers",
				href: "/careers"
			},
			{
				labelKey: "company.links.blog",
				href: "/blog"
			},
			{
				labelKey: "company.links.press",
				href: "/press"
			},
		]
	},
	{
		titleKey: "legal.title",
		links: [
			{
				labelKey: "legal.links.privacy_policy",
				href: "/privacy-policy"
			},
			{
				labelKey: "legal.links.terms_of_service",
				href: "/terms-of-service"
			},
			{
				labelKey: "legal.links.cookie_policy",
				href: "/cookie-policy"
			},
			{
				labelKey: "legal.links.accessibility",
				href: "/accessibility"
			},
		]
	},
]

export const facebookUrl = "https://www.facebook.com/webapp";
export const instagramUrl = "https://www.instagram.com/webapp";