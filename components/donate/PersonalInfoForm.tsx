"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useFormContext } from "@/contexts/FormContext";
import { step2Schema, type Step2FormData } from "@/lib/validation";
import { PhoneInput } from "./PhoneInput";
import { ContributorCard } from "./ContributorCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { heading, text } from "@/styles/typography";

const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const FormTitle = styled.h2`
  ${heading("lg", "bold")}
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    ${heading("sm", "bold")}
  }
`;

const SectionLabel = styled.div`
  ${text("md", "semibold")}
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.text.primary};
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

const SectionDivider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.borderSecondary};
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

const ContributorsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const AddContributorButton = styled(Button)`
  width: 100%;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: auto;
  }
`;

const MAX_CONTRIBUTORS = 5;

interface PersonalInfoFormProps {
  onSubmit: () => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ onSubmit: onSubmitCallback }) => {
  const { t } = useTranslation("form");
  const { formData, updateFormData, currentStep, setCurrentStep } = useFormContext();

  const form = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    mode: "onSubmit",
    defaultValues: {
      firstName: formData.firstName || "",
      lastName: formData.lastName || "",
      email: formData.email || "",
      phone: formData.phone || "",
      additionalContributors: formData.additionalContributors || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "additionalContributors",
  });

  const onSubmit = (data: Step2FormData) => {
    updateFormData(data);
    onSubmitCallback();
  };

  const handleAddContributor = () => {
    if (fields.length < MAX_CONTRIBUTORS) {
      append({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        countryCode: "+421",
      });
    }
  };

  return (
    <Form {...form}>
      <FormContainer onSubmit={form.handleSubmit(onSubmit)}>
        <FormTitle>{t("step2Heading")}</FormTitle>
        <FieldsWrapper>
          <SectionLabel>{t("aboutYou")}</SectionLabel>
          <NameGrid>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("firstName")}</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={t("firstNamePlaceholder")} 
                      aria-required="true"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("lastName")}</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={t("lastNamePlaceholder")} 
                      aria-required="true"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </NameGrid>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("email")}</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder={t("emailPlaceholder")} 
                    aria-required="true"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("phoneLabel")}</FormLabel>
                <FormControl>
                  <PhoneInput
                    value={field.value || ""}
                    onChange={field.onChange}
                    countryCode={formData.countryCode || "+421"}
                    onCountryCodeChange={(code) => updateFormData({ countryCode: code })}
                    aria-label={t("phoneLabel")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FieldsWrapper>

        {fields.length > 0 && <SectionDivider />}

        {fields.length > 0 && (
          <FieldsWrapper>
            <SectionLabel>{t("additionalContributors")}</SectionLabel>
            <ContributorsSection>
              {fields.map((field, index) => (
                <ContributorCard
                  key={field.id}
                  index={index}
                  onRemove={remove}
                  control={form.control}
                />
              ))}
            </ContributorsSection>
          </FieldsWrapper>
        )}

        {fields.length < MAX_CONTRIBUTORS && (
          <>
            {fields.length === 0 && <SectionDivider />}
            <AddContributorButton type="button" variant="outline" onClick={handleAddContributor}>
              <Plus size={18} />
              {t("addContributor")}
            </AddContributorButton>
          </>
        )}
      </FormContainer>
    </Form>
  );
};
