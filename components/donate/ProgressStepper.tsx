"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { text } from "@/styles/typography";
import { Check } from "lucide-react";

interface ProgressStepperProps {
  currentStep: number;
  totalSteps: number;
}

const StepperContainer = styled.div`
  display: flex;
  max-width: 600px;
  margin: 0 auto;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const StepWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

const StepCircle = styled.div<{ $active: boolean; $disabled: boolean; $completed: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $active, $disabled, $completed, theme }) =>
    $completed
      ? theme.colors.background
      : $disabled
        ? theme.colors.muted.main
        : $active
          ? theme.colors.primary.main
          : theme.colors.muted.main};
  color: ${({ $active, $disabled, $completed, theme }) =>
    $completed
      ? theme.colors.primary.main
      : $disabled
        ? theme.colors.muted.foreground
        : $active
          ? theme.colors.primary.foreground
          : theme.colors.muted.foreground};
  border: 2px solid ${({ $completed, $active, $disabled, theme }) =>
    $completed
      ? theme.colors.primary.main
      : $active
        ? theme.colors.primary.main
        : $disabled
          ? theme.colors.border
          : theme.colors.border};
  ${text("md", "semibold")}
  transition: all ${({ theme }) => theme.transitions.normal};
  flex-shrink: 0;
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
`;

const StepLabel = styled.div<{ $active: boolean; $disabled: boolean }>`
  ${text("md", "regular")}
  color: ${({ $active, $disabled, theme }) =>
    $disabled ? theme.colors.text.tertiary : $active ? theme.colors.text.primary : theme.colors.text.secondary};
  transition: all ${({ theme }) => theme.transitions.normal};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    text-align: center;
    white-space: normal;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    ${text("sm", "regular")}
  }
`;

const StepConnector = styled.div<{ $completed: boolean }>`
  width: 100%;
  height: 2px;
  background: ${({ $completed, theme }) => ($completed ? theme.colors.primary.main : theme.colors.border)};
  transition: all ${({ theme }) => theme.transitions.normal};
  align-self: flex-start;
  margin-top: 16px;
`;

export const ProgressStepper: React.FC<ProgressStepperProps> = ({ currentStep, totalSteps }) => {
  const { t } = useTranslation("form");

  const steps = [
    { number: 1, label: t("step1Title") },
    { number: 2, label: t("step2Title") },
    { number: 3, label: t("step3Title") },
  ];

  return (
    <StepperContainer 
      role="progressbar" 
      aria-valuenow={currentStep} 
      aria-valuemin={1} 
      aria-valuemax={totalSteps}
      aria-label={`Step ${currentStep} of ${totalSteps}: ${steps[currentStep - 1]?.label}`}
    >
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <StepWrapper>
            <StepCircle
              $active={currentStep >= step.number}
              $disabled={currentStep < step.number}
              $completed={currentStep > step.number}
              aria-current={currentStep === step.number ? 'step' : undefined}
            >
              {currentStep > step.number ? <Check size={20} strokeWidth={2.5} /> : step.number}
            </StepCircle>
            <StepLabel 
              $active={currentStep >= step.number} 
              $disabled={currentStep < step.number}
              aria-label={`Step ${step.number}: ${step.label}`}
            >
              {step.label}
            </StepLabel>
          </StepWrapper>
          {index < totalSteps - 1 && <StepConnector $completed={currentStep > step.number} aria-hidden="true" />}
        </React.Fragment>
      ))}
    </StepperContainer>
  );
};
