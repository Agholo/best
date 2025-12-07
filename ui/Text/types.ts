export interface TextProps {
  children: React.ReactNode;
  className?: string;
  type?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: TextSize;
  weight?: TextWeight;
  color?: TextColor;
  align?: TextAlign;
  lineHeight?: TextLineHeight;
  letterSpacing?: LetterSpacing;
  textTransform?: TextTransform;
  textDecoration?: TextDecoration;
};

/**
 * Text size
 * @description The size of the text
 * @example
 * xs -> 12px
 * sm -> 14px
 * md -> 16px
 * lg -> 18px
 * xl -> 20px
 * 2xl -> 24px
 * 3xl -> 36px
 * 4xl -> 48px
 * 5xl -> 64px
 * 6xl -> 72px
 */
export type TextSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";

/**
 * Text weight
 * @description The weight of the text
 * @example
 * normal -> 400
 * medium -> 500
 * semibold -> 600
 * bold -> 700
 */
export type TextWeight = "normal" | "medium" | "semibold" | "bold";
export type TextColor = "primary" | "secondary" | "accent" | "tint1" | "tint2" | "tint3";
export type TextAlign = "left" | "center" | "right" | "justify";
/**
 * Text line height
 * @description The line height of the text
 * @example
 * normal -> 1
 * relaxed -> 1.5
 * tight -> 1.25
 * snug -> 1.1
 */
export type TextLineHeight = "none" | "normal" | "relaxed" | "tight" | "snug";
export type LetterSpacing = "normal" | "tight" | "wide" | "wider";
export type TextTransform = "none" | "uppercase" | "lowercase" | "capitalize";
export type TextDecoration = "none" | "underline" | "overline" | "line-through" | "underline-offset-4" | "underline-offset-8";