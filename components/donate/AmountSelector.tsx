"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Step1FormData } from "@/lib/validation";
import { heading, text } from '@/styles/typography';

interface AmountSelectorProps {
  control: Control<Step1FormData>;
  showTitle?: boolean;
}

const AmountContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const AmountInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AmountInput = styled.input`
  ${heading('xl', 'regular')}
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  border-bottom: 3px solid ${({ theme }) => theme.colors.primary.main};
  background: transparent;
  text-align: right;
  width: 150px;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  outline: none;

  &:focus {
    border-bottom-color: ${({ theme }) => theme.colors.primary.main};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    ${heading('md', 'regular')}
    width: 120px;
  }
`;

const CurrencySymbol = styled.span`
  ${heading('xl', 'regular')}
  color: ${({ theme }) => theme.colors.text.secondary};
  border-bottom: 3px solid ${({ theme }) => theme.colors.primary.main};
  padding: ${({ theme }) => theme.spacing.sm} 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    ${heading('md', 'regular')}
  }
`;

const PresetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const PresetButton = styled.button<{ $selected: boolean }>`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 2px solid
    ${({ $selected, theme }) => ($selected ? theme.colors.primary.main : theme.colors.formInput.background)};
  background: ${({ $selected, theme }) => ($selected ? theme.colors.primary.main : theme.colors.formInput.background)};
  color: ${({ $selected, theme }) => ($selected ? theme.colors.primary.foreground : theme.colors.text.secondary)};
  ${text('md', 'medium')}
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.ring};
    outline-offset: 2px;
  }
`;

const presetAmounts = [5, 10, 20, 30, 50, 100];

export const AmountSelector: React.FC<AmountSelectorProps> = ({ control, showTitle = false }) => {
  const { t } = useTranslation("form");

  return (
    <FormField
      control={control}
      name="donationAmount"
      render={({ field }) => (
        <FormItem>
          {showTitle && <FormLabel labelSize="md" labelVariant="semibold">{t("amountToContribute")}</FormLabel>}
          <FormControl>
            <AmountContainer>
              <AmountInputWrapper>
                <AmountInput
                  type="number"
                  value={field.value || ""}
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  min={1}
                  max={10000}
                  placeholder="0"
                  aria-label={t("donationAmount")}
                  aria-required="true"
                  aria-invalid={!!field.value && field.value < 1}
                />
                <CurrencySymbol aria-hidden="true">€</CurrencySymbol>
              </AmountInputWrapper>
              <PresetGrid role="radiogroup" aria-label={t("amountToContribute")}>
                {presetAmounts.map((amount) => (
                  <PresetButton
                    key={amount}
                    type="button"
                    role="radio"
                    $selected={field.value === amount}
                    onClick={() => field.onChange(amount)}
                    aria-pressed={field.value === amount}
                    aria-checked={field.value === amount}
                    aria-label={`${amount} euros`}
                  >
                    {amount}€
                  </PresetButton>
                ))}
              </PresetGrid>
            </AmountContainer>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
