"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "@/contexts/FormContext";
import styled from "styled-components";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step3Schema, Step3FormData } from "@/lib/validation";
import { heading, text } from "@/styles/typography";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useShelters } from "@/hooks/useShelters";
import { useSubmitDonation } from "@/hooks/useSubmitDonation";
import { toast, successToast } from "@/hooks/use-toast";
import { DonationPayload, ContributorPayload } from "@/services/api";
import { SummaryInfoRow } from "./SummaryInfoRow";
import { useConfetti } from "@/hooks/useConfetti";
const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;
const StepTitle = styled.h2`
  ${heading("lg", "bold")}
  color: ${({ theme }) => theme.colors.text};
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const SectionTitle = styled.h3`
  ${text("md", "semibold")}
  color: ${({ theme }) => theme.colors.text};
`;
const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin: ${({ theme }) => theme.spacing.md} 0;
`;
const ConsentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;
const ConsentLabel = styled.label`
  ${text("sm", "medium")}
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  user-select: none;
`;

const ContributorSection = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.borderSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.muted.main};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ContributorNumber = styled.div`
  ${text("xs", "semibold")}
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;
interface ConfirmationStepProps {
  onSubmit: () => void;
  isSubmitting?: boolean;
}
export const ConfirmationStep: React.FC<ConfirmationStepProps> = ({ onSubmit, isSubmitting: externalIsSubmitting }) => {
  const { t, ready } = useTranslation("form");
  const { formData, updateFormData } = useFormContext();
  const { data: shelters } = useShelters();
  const submitDonation = useSubmitDonation();
  const { fireConfetti } = useConfetti();

  const form = useForm<Step3FormData>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      consent: formData.consent || false,
    },
  });

  const transformFormDataToPayload = (): DonationPayload => {
    const contributors: ContributorPayload[] = [
      {
        firstName: formData.firstName!,
        lastName: formData.lastName!,
        email: formData.email!,
        phone: formData.phone || undefined,
      },
    ];

    if (formData.additionalContributors) {
      formData.additionalContributors.forEach((contributor) => {
        if (contributor.firstName && contributor.lastName && contributor.email) {
          contributors.push({
            firstName: contributor.firstName,
            lastName: contributor.lastName,
            email: contributor.email,
            phone: contributor.phone || undefined,
          });
        }
      });
    }

    return {
      contributors,
      shelterID: parseInt(formData.selectedShelterId || "0", 10),
      value: formData.donationAmount || 0,
    };
  };

  const onSubmitForm = async (data: Step3FormData) => {
    updateFormData(data);

    try {
      const payload = transformFormDataToPayload();
      await submitDonation.mutateAsync(payload);
      
      successToast(t("thankYou"), t("donationSuccess"));
      setTimeout(() => fireConfetti(), 100);

      onSubmit();
    } catch (error) {
      toast({
        title: t("common:error"),
        description: t("donationError"),
        variant: "destructive",
      });
    }
  };

  const isSubmitting = externalIsSubmitting || submitDonation.isPending;

  const getDonationType = () => {
    if (formData.donationType === "specific") {
      return t("specificShelter");
    }
    return t("generalFoundation");
  };

  const getShelterName = () => {
    if (formData.selectedShelterId) {
      const shelter = shelters?.find((s) => s.id.toString() === formData.selectedShelterId);
      return shelter?.name || formData.selectedShelterId;
    }
    return null;
  };
  const shouldShowShelterRow = formData.selectedShelterId && formData.selectedShelterId !== "none" && getShelterName();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)}>
        <StepContainer>
          <StepTitle>{t("step3Heading")}</StepTitle>

          <Section aria-labelledby="summary-heading">
            <SectionTitle id="summary-heading">{t("summarySection")}</SectionTitle>
            <SummaryInfoRow label={t("helpForm")} value={getDonationType()} />
            {shouldShowShelterRow && <SummaryInfoRow label={t("shelterLabel")} value={getShelterName()} />}
            <SummaryInfoRow label={t("contributionAmount")} value={`${formData.donationAmount} €`} />
          </Section>

          <Divider role="separator" />

          <Section aria-labelledby="personal-info-heading">
            <SectionTitle id="personal-info-heading" className="sr-only">{t("aboutYou")}</SectionTitle>
            <SummaryInfoRow label={t("nameAndSurname")} value={`${formData.firstName} ${formData.lastName}`} />
            <SummaryInfoRow label={t("email")} value={formData.email} />
            {formData.phone && (
              <SummaryInfoRow label={t("phone")} value={`${formData.countryCode || "+421"} ${formData.phone}`} />
            )}
          </Section>

          {formData.additionalContributors && formData.additionalContributors.length > 0 && (
            <>
              <Divider role="separator" />
              <Section aria-labelledby="contributors-heading">
                <SectionTitle id="contributors-heading">{t("additionalContributors")}</SectionTitle>
                {formData.additionalContributors.map((contributor, index) => (
                  <ContributorSection key={index}>
                    <ContributorNumber>
                      {t("contributor")} #{index + 2}
                    </ContributorNumber>
                    <SummaryInfoRow
                      label={t("nameAndSurname")}
                      value={`${contributor.firstName} ${contributor.lastName}`}
                    />
                    <SummaryInfoRow label={t("email")} value={contributor.email} />
                    {contributor.phone && (
                      <SummaryInfoRow
                        label={t("phone")}
                        value={`${contributor.countryCode || "+421"} ${contributor.phone}`}
                      />
                    )}
                  </ContributorSection>
                ))}
              </Section>
            </>
          )}

          <Divider role="separator" />

          <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
            {isSubmitting ? t("submittingDonation") : ""}
          </div>

          <FormField
            control={form.control}
            name="consent"
            render={({ field }) => (
              <FormItem>
                <ConsentWrapper>
                  <FormControl>
                    <Checkbox 
                      id="consent" 
                      checked={field.value} 
                      onCheckedChange={field.onChange}
                      aria-required="true"
                    />
                  </FormControl>
                  <div style={{ flex: 1 }}>
                    <FormLabel htmlFor="consent">{t("consentText")}</FormLabel>
                  </div>
                </ConsentWrapper>
                <FormMessage />
              </FormItem>
            )}
          />
        </StepContainer>
      </form>
    </Form>
  );
};
