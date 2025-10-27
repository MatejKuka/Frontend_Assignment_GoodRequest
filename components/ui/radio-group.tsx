import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import styled from "styled-components";

const StyledRadioGroup = styled(RadioGroupPrimitive.Root)`
  display: grid;
  gap: 8px;
`;

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ ...props }, ref) => <StyledRadioGroup ref={ref} {...props} />);
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const StyledRadioGroupItem = styled(RadioGroupPrimitive.Item)`
  aspect-ratio: 1;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.primary.main};

  &:focus {
    outline: none;
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.ring};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const StyledIndicator = styled(RadioGroupPrimitive.Indicator)`
  display: flex;
  align-items: center;
  justify-content: center;

  .circle-icon {
    height: 10px;
    width: 10px;
    fill: currentColor;
  }
`;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ ...props }, ref) => (
  <StyledRadioGroupItem ref={ref} {...props}>
    <StyledIndicator>
      <Circle className="circle-icon" />
    </StyledIndicator>
  </StyledRadioGroupItem>
));
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
