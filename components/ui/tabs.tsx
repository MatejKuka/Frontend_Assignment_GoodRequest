import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import styled from "styled-components";

const Tabs = TabsPrimitive.Root;

const StyledTabsList = styled(TabsPrimitive.List)`
  display: inline-flex;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.muted.main};
  padding: 4px;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ ...props }, ref) => <StyledTabsList ref={ref} {...props} />);
TabsList.displayName = TabsPrimitive.List.displayName;

const StyledTabsTrigger = styled(TabsPrimitive.Trigger)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: 6px 12px;
  font-size: 14px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.ring};
    outline-offset: 2px;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  &[data-state="active"] {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.foreground};
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
`;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ ...props }, ref) => <StyledTabsTrigger ref={ref} {...props} />);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const StyledTabsContent = styled(TabsPrimitive.Content)`
  margin-top: 8px;

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.ring};
    outline-offset: 2px;
  }
`;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ ...props }, ref) => <StyledTabsContent ref={ref} {...props} />);
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
