import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import styled from "styled-components";

const StyledCheckbox = styled(CheckboxPrimitive.Root)`
  height: 16px;
  width: 16px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ theme }) => theme.colors.primary.main};
  
  &[data-state="checked"] {
    background: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.foreground};
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.ring};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const StyledIndicator = styled(CheckboxPrimitive.Indicator)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: currentColor;

  .check-icon {
    height: 16px;
    width: 16px;
  }
`;

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ ...props }, ref) => (
  <StyledCheckbox ref={ref} {...props}>
    <StyledIndicator>
      <Check className="check-icon" />
    </StyledIndicator>
  </StyledCheckbox>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
