import { TextProps } from "./types";

export const sizeMap: Record<NonNullable<TextProps["size"]>, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
};

export const weightMap: Record<NonNullable<TextProps["weight"]>, string> = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

export const colorMap: Record<NonNullable<TextProps["color"]>, string> = {
  primary: "text-text-primary",
  secondary: "text-secondary",
  accent: "text-text-accent",
  tint1: "text-text-tint1",
  tint2: "text-text-tint1",
  tint3: "text-text-tint1",
};

export const alignMap: Record<NonNullable<TextProps["align"]>, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

export const lineHeightMap: Record<NonNullable<TextProps["lineHeight"]>, string> = {
	none: "leading-none",
  normal: "leading-normal",
  relaxed: "leading-relaxed",
  tight: "leading-tight",
  snug: "leading-snug",
};

export const letterSpacingMap: Record<NonNullable<TextProps["letterSpacing"]>, string> = {
  normal: "tracking-normal",
  tight: "tracking-tight",
  wide: "tracking-wide",
  wider: "tracking-wider",
};

export const textTransformMap: Record<NonNullable<TextProps["textTransform"]>, string> = {
  none: "",
  uppercase: "uppercase",
  lowercase: "lowercase",
  capitalize: "capitalize",
};

export const textDecorationMap: Record<NonNullable<TextProps["textDecoration"]>, string> = {
  none: "",
  underline: "underline",
  overline: "overline",
  "line-through": "line-through",
  "underline-offset-4": "underline underline-offset-4",
  "underline-offset-8": "underline underline-offset-8",
};
