"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Control, useWatch, useFormContext } from "react-hook-form";
import { Trash2 } from "lucide-react";
import { PhoneInput } from "./PhoneInput";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { text } from '@/styles/typography';

const CardContainer = styled.div`
  position: relative;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const CardTitle = styled.h3`
  ${text('lg', 'semibold')}
  color: ${({ theme }) => theme.colors.text.primary};
`;

const RemoveButton = styled(Button)`
  color: ${({ theme }) => theme.colors.destructive.main};
  
  &:hover {
    background: ${({ theme }) => theme.colors.destructive.main};
    color: ${({ theme }) => theme.colors.destructive.foreground};
  }
`;

const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const NameGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

interface ContributorCardProps {
  index: number;
  onRemove: (index: number) => void;
  control: Control<any>;
}

export const ContributorCard: React.FC<ContributorCardProps> = ({
  index,
  onRemove,
  control,
}) => {
  const { t } = useTranslation("form");
  const { setValue } = useFormContext();
  
  const countryCode = useWatch({
    control,
    name: `additionalContributors.${index}.countryCode`,
    defaultValue: "+421",
  });

  return (
    <CardContainer>
      <CardHeader>
        <CardTitle>
          {t("contributor")} #{index + 2}
        </CardTitle>
        <RemoveButton
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onRemove(index)}
          aria-label={t("removeContributor")}
        >
          <Trash2 size={18} />
        </RemoveButton>
      </CardHeader>

      <FieldsWrapper>
        <NameGrid>
          <FormField
            control={control}
            name={`additionalContributors.${index}.firstName`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("firstName")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("firstNamePlaceholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={`additionalContributors.${index}.lastName`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("lastName")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("lastNamePlaceholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </NameGrid>

        <FormField
          control={control}
          name={`additionalContributors.${index}.email`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("email")}</FormLabel>
              <FormControl>
                <Input type="email" placeholder={t("emailPlaceholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`additionalContributors.${index}.phone`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("phoneLabel")}</FormLabel>
              <FormControl>
                <PhoneInput
                  value={field.value || ""}
                  onChange={field.onChange}
                  countryCode={countryCode || "+421"}
                  onCountryCodeChange={(code) => {
                    setValue(`additionalContributors.${index}.countryCode`, code);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FieldsWrapper>
    </CardContainer>
  );
};
