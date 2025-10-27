"use client";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { FeaturesListComponent } from "@/components/homepage/FeaturesList";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/homepage/HeroSection";
import { CreditsCard } from "@/components/homepage/CreditsCard";
import { StructuredData } from "@/components/seo/StructuredData";

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 60px 80px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  }
`;

const PageContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 40px;
  background: ${({ theme }) => theme.colors.background};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: 30px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 20px;
  }
`;



export default function HomePage() {
  const { t } = useTranslation("common");

  return (
    <>
      <PageWrapper>
        <PageContainer id="main-content" role="main" aria-label="Main content">
          <HeroSection />
          <FeaturesListComponent />
          <CreditsCard />
        </PageContainer>
        <Footer />
      </PageWrapper>
      <StructuredData
        data={{
          type: "Organization",
          name: "GoodBoy Foundation",
          url: "https://goodboyfoundation.sk",
          logo: "https://goodboyfoundation.sk/logo.svg",
          description: t("seo.home.description"),
          contactPoint: {
            telephone: "+421 123 456 789",
            email: "info@goodboyfoundation.sk",
            contactType: "Customer Service",
          },
          sameAs: ["https://www.facebook.com/goodboyfoundation", "https://www.instagram.com/goodboyfoundation"],
        }}
      />
    </>
  );
};