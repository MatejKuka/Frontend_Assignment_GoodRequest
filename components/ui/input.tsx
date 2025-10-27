import * as React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  display: flex;
  height: auto;
  width: 100%;
  border-radius: 8px;
  border: 0;
  padding: 16px;
  font-size: 16px;
  background: hsl(220, 14%, 96%);
  color: hsl(220, 26%, 11%);

  &::placeholder {
    color: hsl(220, 13%, 65%);
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

  &[type="file"] {
    border: 0;
    background: transparent;
    font-size: 14px;
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    color: ${({ theme }) => theme.colors.foreground};
  }
`;

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ type, ...props }, ref) => {
    return <StyledInput type={type} ref={ref} {...props} />;
  },
);
Input.displayName = "Input";

export { Input };
