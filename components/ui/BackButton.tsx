import React from "react";
import styled from "styled-components";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { text } from '@/styles/typography';
import { useTranslation } from "react-i18next";

const BackButtonContainer = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.primary.main};
  ${text('md', 'medium')}
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

export const BackButton = () => {
    const { t } = useTranslation("common");
  return (
    <BackButtonContainer href={"/"} aria-label="Go back to homepage">
      <ArrowLeft size={20} aria-hidden="true" />
      {t("previous")}
    </BackButtonContainer>
  );
};
