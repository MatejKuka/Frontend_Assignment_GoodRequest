"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { text } from "@/styles/typography";

interface DonationTypeToggleProps {
  value: "specific" | "general";
  onChange: (value: "specific" | "general") => void;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  ${text("sm", "medium")}
  color: ${({ theme }) => theme.colors.foreground};
`;

const StyledTabs = styled(Tabs)`
  width: 100%;
`;

const StyledTabsList = styled(TabsList)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  height: auto;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.borderSecondary};
  padding: 4px;
  border-radius: 12px;
`;

const StyledTabsTrigger = styled(TabsTrigger)`
  ${text("sm", "medium")}
  padding: 16px 8px;
  border-radius: 8px;
  white-space: normal;
  line-height: 1.25;
  background: ${({ theme }) => theme.colors.background};
  border: none;

  &[data-state="active"] {
    background: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.foreground};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    ${text("xs", "medium")}
  }
`;

export const DonationTypeToggle: React.FC<DonationTypeToggleProps> = ({ value, onChange }) => {
  const { t } = useTranslation("form");
  const isMobile = useIsMobile();

  return (
    <Container>
      {isMobile && <Label>{t("contributeTo")}</Label>}
      <StyledTabs value={value} onValueChange={(value) => onChange(value as "specific" | "general")}>
        <StyledTabsList role="radiogroup" aria-label={t("contributeTo")}>
          <StyledTabsTrigger 
            value="specific"
            role="radio"
            aria-checked={value === "specific"}
          >
            {isMobile ? t("specificShelterShort") : t("specificShelter")}
          </StyledTabsTrigger>
          <StyledTabsTrigger 
            value="general"
            role="radio"
            aria-checked={value === "general"}
          >
            {isMobile ? t("generalFoundationShort") : t("generalFoundation")}
          </StyledTabsTrigger>
        </StyledTabsList>
      </StyledTabs>
    </Container>
  );
};
