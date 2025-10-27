import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import styled from "styled-components";
import { X } from "lucide-react";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = styled(ToastPrimitives.Viewport)`
  position: fixed;
  top: 0;
  z-index: 100;
  display: flex;
  max-height: 100vh;
  width: 100%;
  flex-direction: column-reverse;
  padding: ${({ theme }) => theme.spacing.md};
  
  @media (min-width: 640px) {
    bottom: 0;
    right: 0;
    top: auto;
    flex-direction: column;
  }
  
  @media (min-width: 768px) {
    max-width: 420px;
  }
  
  &[data-state="open"] {
    animation: slide-in-from-top-full 0.3s ease-out;
  }
  
  &[data-state="closed"] {
    animation: slide-out-to-right-full 0.3s ease-out;
  }
`;

const ToastContainer = styled(ToastPrimitives.Root)<{ $variant?: 'default' | 'destructive' | 'success' }>`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.lg};
  padding-right: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  transition: all 0.3s ease;
  
  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'destructive':
        return `
          background-color: ${theme.colors.destructive.main};
          color: ${theme.colors.destructive.foreground};
          border-color: ${theme.colors.destructive.main};
        `;
      case 'success':
        return `
          background-color: hsl(142, 71%, 45%);
          color: white;
          border: none;
          border-radius: ${theme.borderRadius.lg};
          padding: ${theme.spacing.lg};
          box-shadow: 0 10px 40px rgba(16, 185, 129, 0.3);
          max-width: calc(100vw - 2rem);
          
          @media (min-width: 640px) {
            min-width: 500px;
            max-width: 650px;
            padding: ${theme.spacing.xl};
          }
        `;
      default:
        return `
          background-color: ${theme.colors.background};
          color: ${theme.colors.foreground};
        `;
    }
  }}
`;

const ToastClose = styled(ToastPrimitives.Close)`
  position: absolute;
  right: ${({ theme }) => theme.spacing.sm};
  top: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xs};
  color: white;
  background: none;
  border: none;
  opacity: 1;
  transition: opacity 0.2s;
  cursor: pointer;
  
  &:hover {
    opacity: 0.7;
  }
  
  &:focus {
    opacity: 1;
    outline: 2px solid white;
    outline-offset: 2px;
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const ToastTitle = styled(ToastPrimitives.Title)`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
`;

const ToastDescription = styled(ToastPrimitives.Description)`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  opacity: 0.9;
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const ToastAction = styled(ToastPrimitives.Action)`
  display: inline-flex;
  height: 2rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid transparent;
  background-color: transparent;
  padding: 0 ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: all 0.2s;
  cursor: pointer;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary || theme.colors.muted.main};
  }
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.ring || theme.colors.primary.main};
    outline-offset: 2px;
  }
`;

type ToastProps = React.ComponentPropsWithoutRef<typeof ToastContainer> & {
  variant?: 'default' | 'destructive' | 'success';
};

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  ToastContainer as Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
