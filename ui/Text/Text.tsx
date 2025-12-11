import { cn } from "@/lib/utils";
import { TextProps } from "./types";
import { sizeMap, weightMap, colorMap, alignMap, lineHeightMap, letterSpacingMap, textTransformMap, textDecorationMap } from "./data";

export default function Text({
	children,
	className,
	type = "p",
	size = "md",
	weight = "normal",
	color = "accent",
	align = "left",
	lineHeight = "normal",
	letterSpacing = "normal",
	textTransform = "none",
	textDecoration = "none",
}: TextProps) {
	const Component = type;

	const classes = cn(
		sizeMap[size],
		weightMap[weight],
		colorMap[color],
		alignMap[align],
		lineHeightMap[lineHeight],
		letterSpacingMap[letterSpacing],
		textTransformMap[textTransform],
		textDecorationMap[textDecoration],
		className
	);

	return <Component className={classes}>{children}</Component>;
}