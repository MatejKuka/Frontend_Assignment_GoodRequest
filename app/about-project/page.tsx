"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/seo/StructuredData";
import { BackButton } from "@/components/ui/BackButton";
import { StatCard } from "@/components/about-project/StatCard";
import { useCountUp } from "@/hooks/useCountUp";
import { useShelterResults } from "@/hooks/useShelterResults";
import { heading, text } from "@/styles/typography";

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const PageContainer = styled.main`
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 80px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  }
`;


const Title = styled.h1`
  ${heading("lg", "bold")}
  color: ${({ theme }) => theme.colors.foreground};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    ${heading("md", "bold")}
  }
`;

const Description = styled.p`
  ${text("md", "regular")}
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const StatsSection = styled.div`
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing["3xl"]};
  border-top: 1px solid ${({ theme }) => theme.colors.borderSecondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSecondary};
  margin: 0 32px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl};
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing["3xl"]};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;


export default function AboutProjectPage() {
  const { t } = useTranslation("common");
  const { data, isLoading, isError } = useShelterResults();

  const totalAmount = useCountUp({
    end: data?.contribution ?? 0,
    duration: "dynamic",
    startOnMount: !!data,
  });
  const donorCount = useCountUp({
    end: data?.contributors ?? 0,
    duration: "dynamic",
    startOnMount: !!data,
  });

  const formatAmount = (amount: number) => {
    return amount.toLocaleString("sk-SK");
  };

  return (
    <>
      <PageWrapper>
        <PageContainer id="main-content" role="main" aria-label="About project information">
          <BackButton/>

          <Title>{t("aboutProjectPage.title")}</Title>

          <Description>{t("aboutProjectPage.intro")}</Description>

          <StatsSection aria-labelledby="stats-heading">
            <StatsGrid>
              <StatCard
                value={`${formatAmount(totalAmount)} €`}
                label={t("aboutProjectPage.totalCollected")}
                isLoading={isLoading}
                isError={isError}
                ariaLabel={
                  isLoading 
                    ? "Loading total collected amount" 
                    : isError 
                    ? "Total collected amount unavailable" 
                    : `Total collected: ${formatAmount(totalAmount)} euros`
                }
              />
              <StatCard
                value={formatAmount(donorCount)}
                label={t("aboutProjectPage.donorCount")}
                isLoading={isLoading}
                isError={isError}
                ariaLabel={
                  isLoading 
                    ? "Loading donor count" 
                    : isError 
                    ? "Donor count unavailable" 
                    : `Total donors: ${formatAmount(donorCount)}`
                }
              />
            </StatsGrid>
          </StatsSection>

          <Description>{t("aboutProjectPage.mission")}</Description>

          <Footer />
        </PageContainer>
      </PageWrapper>
      <StructuredData
        data={{
          type: 'WebPage',
          name: t("seo.about.title"),
          description: t("seo.about.description"),
          url: 'https://goodboyfoundation.sk/about-project'
        }}
      />
    </>
  );
};