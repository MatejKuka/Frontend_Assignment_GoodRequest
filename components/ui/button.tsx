import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import styled, { css } from "styled-components";

interface StyledButtonProps {
  $variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'styled' | 'back';
  $size?: 'default' | 'sm' | 'lg' | 'icon';
}

const getVariantStyles = ($variant: string = 'default') => {
  switch ($variant) {
    case 'default':
      return css`
        background: ${({ theme }) => theme.colors.primary.main};
        color: ${({ theme }) => theme.colors.primary.foreground};
        &:hover:not(:disabled) {
          background: ${({ theme }) => theme.colors.primary.main};
          opacity: 0.9;
        }
      `;
    case 'destructive':
      return css`
        background: ${({ theme }) => theme.colors.destructive.main};
        color: ${({ theme }) => theme.colors.destructive.foreground};
        &:hover:not(:disabled) {
          background: ${({ theme }) => theme.colors.destructive.main};
          opacity: 0.9;
        }
      `;
    case 'outline':
      return css`
        border: 1px solid ${({ theme }) => theme.colors.input};
        background: ${({ theme }) => theme.colors.background};
        &:hover:not(:disabled) {
          background: ${({ theme }) => theme.colors.accent.main};
          color: ${({ theme }) => theme.colors.accent.foreground};
        }
      `;
    case 'secondary':
      return css`
        background: ${({ theme }) => theme.colors.secondary.main};
        color: ${({ theme }) => theme.colors.secondary.foreground};
        &:hover:not(:disabled) {
          background: ${({ theme }) => theme.colors.secondary.main};
          opacity: 0.8;
        }
      `;
    case 'ghost':
      return css`
        background: transparent;
        &:hover:not(:disabled) {
          background: ${({ theme }) => theme.colors.accent.main};
          color: ${({ theme }) => theme.colors.accent.foreground};
        }
      `;
    case 'link':
      return css`
        background: transparent;
        color: ${({ theme }) => theme.colors.primary.main};
        text-decoration: underline;
        text-underline-offset: 4px;
        &:hover:not(:disabled) {
          text-decoration: underline;
        }
      `;
    case 'styled':
      return css`
        background: ${({ theme }) => theme.colors.primary.main};
        color: ${({ theme }) => theme.colors.text.inversePrimary};
        border-radius: 8px;
        padding: 16px 32px;
        gap: 8px;
        &:hover:not(:disabled) {
          background: ${({ theme }) => theme.colors.primary.main};
          color: ${({ theme }) => theme.colors.primary.foreground};
          opacity: 0.9;
        }
      `;
    case 'back':
      return css`
        background: ${({ theme }) => theme.colors.formInput.background};
        color: ${({ theme }) => theme.colors.button.backText};
        border-radius: 8px;
        &:hover:not(:disabled) {
          background: ${({ theme }) => theme.colors.button.backBg};
          opacity: 0.8;
        }
      `;
    default:
      return '';
  }
};

const getSizeStyles = ($size: string = 'default') => {
  switch ($size) {
    case 'sm':
      return css`
        height: 36px;
        border-radius: ${({ theme }) => theme.borderRadius.md};
        padding: 0 12px;
      `;
    case 'lg':
      return css`
        height: 44px;
        border-radius: ${({ theme }) => theme.borderRadius.md};
        padding: 0 32px;
      `;
    case 'icon':
      return css`
        height: 40px;
        width: 40px;
        padding: 0;
      `;
    default:
      return css`
        height: 40px;
        padding: 8px 16px;
      `;
  }
};

const baseButtonStyles = css<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  white-space: nowrap;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 14px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  border: none;
  outline: none;
  transition: all ${({ theme }) => theme.transitions.fast};
  cursor: pointer;

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.ring};
    outline-offset: 2px;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  svg {
    pointer-events: none;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  ${({ $variant }) => getVariantStyles($variant)}
  ${({ $size }) => getSizeStyles($size)}
`;

const StyledButton = styled.button<StyledButtonProps>`
  ${baseButtonStyles}
`;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'styled' | 'back';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'default', asChild = false, className, ...props }, ref) => {
    if (asChild) {
      // Create a styled Slot component that applies button styles
      const StyledSlot = styled(Slot)<StyledButtonProps>`
        ${baseButtonStyles}
      `;
      return <StyledSlot ref={ref} $variant={variant} $size={size} className={className} {...props} />;
    }
    return <StyledButton ref={ref} $variant={variant} $size={size} className={className} {...props} />;
  },
);
Button.displayName = "Button";

// Helper function for backward compatibility with components using buttonVariants
export const getButtonClassName = (variant?: ButtonProps['variant'], size?: ButtonProps['size']): string => {
  // This returns empty string but components can use Button styles via CSS
  return '';
};

// For backward compatibility
export const buttonVariants = (props?: { variant?: ButtonProps['variant']; size?: ButtonProps['size'] }) => {
  return getButtonClassName(props?.variant, props?.size);
};

export { Button };
