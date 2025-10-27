"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormContext } from "@/contexts/FormContext";
import { step1Schema, type Step1FormData } from "@/lib/validation";
import { Form } from "@/components/ui/form";
import { DonationTypeToggle } from "./DonationTypeToggle";
import { ShelterSelect } from "./ShelterSelect";
import { AmountSelector } from "./AmountSelector";
import { heading } from "@/styles/typography";

const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const FormTitle = styled.h2`
  ${heading("lg", "bold")}
  color: ${({ theme }) => theme.colors.text.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    ${heading("sm", "bold")}
  }
`;

interface DonationTypeStepProps {
  onSubmit: () => void;
}

export const DonationTypeStep: React.FC<DonationTypeStepProps> = ({ onSubmit: onSubmitCallback }) => {
  const { t } = useTranslation("form");
  const { formData, updateFormData } = useFormContext();

  const form = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      donationType: formData.donationType || "specific",
      selectedShelterId: formData.selectedShelterId,
      donationAmount: formData.donationAmount || 50,
    },
  });

  const {
    setValue,
    watch,
    handleSubmit,
  } = form;

  const donationType = watch("donationType");

  const onSubmit = (data: Step1FormData) => {
    updateFormData(data);
    onSubmitCallback();
  };

  return (
    <Form {...form}>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <FormTitle>{t("chooseHowToHelp")}</FormTitle>
        <DonationTypeToggle value={donationType} onChange={(value) => setValue("donationType", value)} />

        {donationType === "specific" && (
          <>
            <ShelterSelect control={form.control} />
            <AmountSelector control={form.control} showTitle={true} />
          </>
        )}

        {donationType === "general" && (
          <>
            <ShelterSelect control={form.control} />
            <AmountSelector control={form.control} showTitle={true} />
          </>
        )}
      </FormContainer>
    </Form>
  );
};
