"use client";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Footer } from "@/components/Footer";
import { DonationForm } from "@/components/donate/DonationForm";
import { FormNavigation } from "@/components/donate/FormNavigation";
import { useFormContext } from "@/contexts/FormContext";
import dogImage from "@/assets/dog-donation.jpg";
import { useRouter } from "next/navigation";
import Image from "next/image";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const ContentGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 60fr 40fr;
  margin: 0 auto;
  width: 100%;
  max-width: 1400px;
  min-height: 100vh;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 40px 60px;
  background: ${({ theme }) => theme.colors.background};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 10px 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 10px 20px;
  }
`;

const FormFooterWrapper = styled.div`
  margin-top: auto;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  gap: 40px;
  flex-direction: column;
`;

const ImageSection = styled.div`
  position: sticky;
  top: 20px;
  height: calc(100vh - 40px);
  align-self: flex-start;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const DogImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
`;

export default function Donate () {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { currentStep, setCurrentStep, resetFormData } = useFormContext();

  const handleBack = () => {
    if (currentStep === 1) {
        router.push("/");
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleContinue = () => {
    const form = document.querySelector("form");
    if (form) {
      form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
    }
  };

  const handleFormComplete = () => {
    router.push("/");
    resetFormData();
  };

  return (
    <>
      <PageWrapper>
        <ContentGrid>
        <FormSection id="main-content" role="main" aria-label="Donation form">
          <DonationForm onSubmit={currentStep === 3 ? handleFormComplete : () => setCurrentStep(currentStep + 1)} />
          <FormFooterWrapper>
            <FormNavigation onBack={handleBack} onContinue={handleContinue} isLastStep={currentStep === 3} />
            <Footer />
          </FormFooterWrapper>
        </FormSection>
        <ImageSection aria-hidden="true">
          <DogImage src={dogImage} alt="Happy rescued dog from Slovak shelter, showing the impact of donations" />
        </ImageSection>
      </ContentGrid>
    </PageWrapper>
    </>
  );
};
