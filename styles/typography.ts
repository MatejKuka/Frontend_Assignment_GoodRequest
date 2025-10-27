import { css } from "styled-components";
import { Theme } from "./theme";

export type HeadingSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export type TextSize = "xs" | "sm" | "md" | "lg" | "xl";
export type TypographyVariant = "regular" | "medium" | "semibold" | "bold" | "decorative";

export const heading = (size: HeadingSize, variant: TypographyVariant = "regular") => css`
  font-size: ${({ theme }: { theme: Theme }) => theme.typography.headings[size][variant].fontSize};
  line-height: ${({ theme }: { theme: Theme }) => theme.typography.headings[size][variant].lineHeight};
  font-weight: ${({ theme }: { theme: Theme }) => theme.typography.headings[size][variant].fontWeight};
`;

export const text = (size: TextSize, variant: TypographyVariant = "regular") => css`
  font-size: ${({ theme }: { theme: Theme }) => theme.typography.text[size][variant].fontSize};
  line-height: ${({ theme }: { theme: Theme }) => theme.typography.text[size][variant].lineHeight};
  font-weight: ${({ theme }: { theme: Theme }) => theme.typography.text[size][variant].fontWeight};
`;
