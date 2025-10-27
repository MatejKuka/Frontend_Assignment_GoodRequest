"use client";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import { useFormContext } from "@/contexts/FormContext";
import { ProgressStepper } from "./ProgressStepper";
import { DonationTypeStep } from "./DonationTypeStep";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { ConfirmationStep } from "./ConfirmationStep";
import { AnimatedFormStep } from "./AnimatedFormStep";

const FormContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

interface DonationFormProps {
  onSubmit: () => void;
}

export const DonationForm: React.FC<DonationFormProps> = ({ onSubmit: onSubmitCallback }) => {
  const { currentStep, previousStep } = useFormContext();
  const progressStepperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobileOrTablet = window.innerWidth < 1024;
    if (isMobileOrTablet && progressStepperRef.current) {
      progressStepperRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentStep]);

  const direction = currentStep > previousStep ? 1 : -1;

  return (
    <FormContentContainer>
      <div ref={progressStepperRef}>
        <ProgressStepper currentStep={currentStep} totalSteps={3} />
      </div>
      <AnimatePresence mode="wait" initial={false}>
        {currentStep === 1 ? (
          <AnimatedFormStep key="step1" direction={direction}>
            <DonationTypeStep onSubmit={onSubmitCallback} />
          </AnimatedFormStep>
        ) : currentStep === 2 ? (
          <AnimatedFormStep key="step2" direction={direction}>
            <PersonalInfoForm onSubmit={onSubmitCallback} />
          </AnimatedFormStep>
        ) : currentStep === 3 ? (
          <AnimatedFormStep key="step3" direction={direction}>
            <ConfirmationStep onSubmit={onSubmitCallback} />
          </AnimatedFormStep>
        ) : null}
      </AnimatePresence>
    </FormContentContainer>
  );
};
