"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Contributor {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  countryCode?: string;
}

export interface FormData {
  donationType?: 'specific' | 'general';
  selectedShelterId?: string;
  donationAmount?: number;
  
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  countryCode?: string;
  
  additionalContributors?: Contributor[];
  
  consent?: boolean;
}

interface FormContextValue {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  resetFormData: () => void;
  currentStep: number;
  previousStep: number;
  setCurrentStep: (step: number) => void;
}

const FormContext = createContext<FormContextValue | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>({});
  const [currentStep, setCurrentStepState] = useState(1);
  const [previousStep, setPreviousStep] = useState(1);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const setCurrentStep = (step: number) => {
    setPreviousStep(currentStep);
    setCurrentStepState(step);
  };

  const resetFormData = () => {
    setFormData({});
    setPreviousStep(1);
    setCurrentStepState(1);
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
        resetFormData,
        currentStep,
        previousStep,
        setCurrentStep,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within FormProvider');
  }
  return context;
};
