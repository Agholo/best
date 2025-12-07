export interface FooterLink {
	labelKey: string;
	href: string;
}

export interface FooterInfoGroup {
	titleKey: string;
	links: FooterLink[];
}