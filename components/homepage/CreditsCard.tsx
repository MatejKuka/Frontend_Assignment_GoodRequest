import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { text } from "@/styles/typography";

const CreditsCardContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  max-width: 500px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.card.main};
  ${text("md", "regular")}
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const CreditsLink = styled.a`
  ${text("md", "medium")}
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

export const CreditsCard: React.FC = () => {
  const { t } = useTranslation("common");

  return (
    <CreditsCardContainer
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <span>{t("implementedBy")}</span>
      <CreditsLink
        href="https://www.linkedin.com/in/matej-kuka-126a691b9/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit Matej Kuka's LinkedIn profile"
      >
        Matej Kuka
      </CreditsLink>
    </CreditsCardContainer>
  );
};
