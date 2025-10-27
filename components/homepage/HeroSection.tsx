"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { heading, text } from "@/styles/typography";
import Link from "next/link";

const Hero = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 80px 0;
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 60px 0;
    gap: ${({ theme }) => theme.spacing.sm};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 40px 0;
  }
`;

const HeroTitle = styled(motion.h1)`
  ${heading("xxl", "medium")}
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.foreground};
  margin: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    ${heading("xl", "medium")}
  }
`;

const HeroTagline = styled(motion.p)`
  ${text("xl", "regular")}
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 600px;
  margin: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    ${text("lg", "regular")}
  }
`;

const StyledDonateButton = styled(motion.div)`
  display: inline-flex;
`;

const ButtonContent = styled(Button)`
  padding: 1rem 2.5rem;
  height: auto;
  ${text("md", "medium")}
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const HeroSection: React.FC = () => {
  const { t } = useTranslation("common");

  return (
    <Hero>
      <HeroTitle
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0 }}
      >
        {t("welcome")}
      </HeroTitle>
      <HeroTagline
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {t("homepage.tagline")}
      </HeroTagline>
      <StyledDonateButton
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ButtonContent variant="styled" asChild>
          <Link href="/donate" aria-label="Navigate to donation form">
            {t("donate")}
          </Link>
        </ButtonContent>
      </StyledDonateButton>
    </Hero>
  );
};
