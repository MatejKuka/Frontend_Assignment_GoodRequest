"use client";
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import { Controller, ControllerProps, FieldPath, FieldValues, FormProvider, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Label } from "@/components/ui/label";
import { text, TextSize, TypographyVariant } from "@/styles/typography";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

const StyledFormItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ ...props }, ref) => {
    const id = React.useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <StyledFormItem ref={ref} {...props} />
      </FormItemContext.Provider>
    );
  },
);
FormItem.displayName = "FormItem";

const StyledFormLabel = styled(Label)<{ 
  $hasError?: boolean; 
  $labelSize?: TextSize; 
  $labelVariant?: TypographyVariant; 
}>`
color: ${({ theme }) => theme.colors.text.primary};
  ${({ $labelSize = "sm", $labelVariant = "medium" }) => text($labelSize, $labelVariant)}
  ${({ $hasError, theme }) => $hasError && `color: ${theme.colors.destructive.main};`}
`;

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & {
    labelSize?: TextSize;
    labelVariant?: TypographyVariant;
  }
>(({ labelSize, labelVariant, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <StyledFormLabel 
      ref={ref} 
      $hasError={!!error} 
      $labelSize={labelSize} 
      $labelVariant={labelVariant} 
      htmlFor={formItemId} 
      {...props} 
    />
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<React.ElementRef<typeof Slot>, React.ComponentPropsWithoutRef<typeof Slot>>(
  ({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

    return (
      <Slot
        ref={ref}
        id={formItemId}
        aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
        aria-invalid={!!error}
        {...props}
      />
    );
  },
);
FormControl.displayName = "FormControl";

const StyledFormDescription = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

const FormDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ ...props }, ref) => {
    const { formDescriptionId } = useFormField();

    return <StyledFormDescription ref={ref} id={formDescriptionId} {...props} />;
  },
);
FormDescription.displayName = "FormDescription";

const StyledFormMessage = styled.p`
  font-size: 14px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.destructive.main};
`;

const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ children, ...props }, ref) => {
    const { t } = useTranslation();
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message) : children;
    
    const translatedBody = body && typeof body === 'string' && body.includes(':') 
      ? t(body) 
      : body;

    if (!translatedBody) {
      return null;
    }

    return (
      <StyledFormMessage 
        ref={ref} 
        id={formMessageId} 
        role="alert"
        aria-live="polite"
        {...props}
      >
        {translatedBody}
      </StyledFormMessage>
    );
  },
);
FormMessage.displayName = "FormMessage";

export { useFormField, Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField };
