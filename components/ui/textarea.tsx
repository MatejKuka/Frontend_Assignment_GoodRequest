import * as React from "react";
import styled from "styled-components";

const StyledTextarea = styled.textarea`
  display: flex;
  min-height: 80px;
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.input};
  background: ${({ theme }) => theme.colors.background};
  padding: 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.foreground};

  &::placeholder {
    color: ${({ theme }) => theme.colors.muted.foreground};
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

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ ...props }, ref) => {
    return <StyledTextarea ref={ref} {...props} />;
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
