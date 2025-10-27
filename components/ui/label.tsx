import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import styled from "styled-components";

const StyledLabel = styled(LabelPrimitive.Root)`
  font-size: 14px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 1;
  
  &:has(+ :disabled) {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ ...props }, ref) => <StyledLabel ref={ref} {...props} />);

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };