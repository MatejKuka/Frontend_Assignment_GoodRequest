import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import styled from "styled-components";

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const StyledSelectTrigger = styled(SelectPrimitive.Trigger)`
  display: flex;
  height: auto;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  border: 0;
  padding: 16px;
  font-size: 16px;
  background: hsl(220, 14%, 96%);
  color: hsl(220, 26%, 11%);
  outline: none;

  &::placeholder {
    color: hsl(220, 13%, 65%);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.ring};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  & > span {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;

const StyledSelectIcon = styled(SelectPrimitive.Icon)`
  .chevron-icon {
    height: 16px;
    width: 16px;
    opacity: 0.5;
  }
`;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ children, ...props }, ref) => (
  <StyledSelectTrigger ref={ref} {...props}>
    {children}
    <StyledSelectIcon asChild>
      <ChevronDown className="chevron-icon" />
    </StyledSelectIcon>
  </StyledSelectTrigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const StyledScrollButton = styled.div`
  display: flex;
  cursor: default;
  align-items: center;
  justify-content: center;
  padding: 4px 0;

  .chevron-icon {
    height: 16px;
    width: 16px;
  }
`;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton ref={ref} asChild {...props}>
    <StyledScrollButton>
      <ChevronUp className="chevron-icon" />
    </StyledScrollButton>
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton ref={ref} asChild {...props}>
    <StyledScrollButton>
      <ChevronDown className="chevron-icon" />
    </StyledScrollButton>
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const StyledSelectContent = styled(SelectPrimitive.Content)<{ $position?: string }>`
  position: relative;
  z-index: 50;
  max-height: 384px;
  min-width: 8rem;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.popover.main};
  color: ${({ theme }) => theme.colors.popover.foreground};
  box-shadow: ${({ theme }) => theme.shadows.md};

  &[data-state="open"] {
    animation: fade-in 0.15s ease-out, scale-in 0.15s ease-out;
  }

  &[data-state="closed"] {
    animation: fade-out 0.15s ease-out, scale-out 0.15s ease-out;
  }

  ${({ $position }) =>
    $position === "popper" &&
    `
    &[data-side="bottom"] {
      transform: translateY(4px);
    }
    &[data-side="left"] {
      transform: translateX(-4px);
    }
    &[data-side="right"] {
      transform: translateX(4px);
    }
    &[data-side="top"] {
      transform: translateY(-4px);
    }
  `}
`;

const StyledSelectViewport = styled(SelectPrimitive.Viewport)<{ $position?: string }>`
  padding: 4px;

  ${({ $position }) =>
    $position === "popper" &&
    `
    height: var(--radix-select-trigger-height);
    width: 100%;
    min-width: var(--radix-select-trigger-width);
  `}
`;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <StyledSelectContent ref={ref} $position={position} position={position} {...props}>
      <SelectScrollUpButton />
      <StyledSelectViewport $position={position}>
        {children}
      </StyledSelectViewport>
      <SelectScrollDownButton />
    </StyledSelectContent>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const StyledSelectLabel = styled(SelectPrimitive.Label)`
  padding: 6px 8px 6px 32px;
  font-size: 14px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ ...props }, ref) => <StyledSelectLabel ref={ref} {...props} />);
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const StyledSelectItem = styled(SelectPrimitive.Item)`
  position: relative;
  display: flex;
  width: 100%;
  cursor: default;
  user-select: none;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: 6px 8px 6px 32px;
  font-size: 14px;
  outline: none;

  &[data-disabled] {
    pointer-events: none;
    opacity: 0.5;
  }

  &:focus {
    background: ${({ theme }) => theme.colors.accent.main};
    color: ${({ theme }) => theme.colors.accent.foreground};
  }
`;

const StyledIndicatorContainer = styled.span`
  position: absolute;
  left: 8px;
  display: flex;
  height: 14px;
  width: 14px;
  align-items: center;
  justify-content: center;

  .check-icon {
    height: 16px;
    width: 16px;
  }
`;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ children, ...props }, ref) => (
  <StyledSelectItem ref={ref} {...props}>
    <StyledIndicatorContainer>
      <SelectPrimitive.ItemIndicator>
        <Check className="check-icon" />
      </SelectPrimitive.ItemIndicator>
    </StyledIndicatorContainer>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </StyledSelectItem>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const StyledSelectSeparator = styled(SelectPrimitive.Separator)`
  margin: 4px -4px;
  height: 1px;
  background: ${({ theme }) => theme.colors.muted.main};
`;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ ...props }, ref) => <StyledSelectSeparator ref={ref} {...props} />);
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
